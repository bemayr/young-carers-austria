import { createMachine } from "xstate";
import { OnlineStatus } from "../../server/links";
import { OpenGraphData } from "../../server/opengraph";

interface Context {
  url: string;
  onlineStatus: OnlineStatus | undefined;
  openGraphData: OpenGraphData | undefined;
}

type Events =
  | {
      type: "URL Changed";
      url: string;
    }
  | {
      type: "Accept Proposed URL";
    };

type Services = {
  "Fetch Online Status": {
    data: OnlineStatus;
  };
  "Fetch Open Graph Data": {
    data: OpenGraphData | undefined;
  };
};

/** @xstate-layout */
export const urlEditMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFUBKAZABAUQgSwBdMBZAQwGMALPAOzADoBhSgexdjEwHkaAbWzgGUCpAgFdYAYkSgADu0J4WNGSAAeiAIyaAbACZ6ADk16ArAAZdAdnOntAFgA0IAJ6IAnAcOmrm+-esfQwBmUwBfMOc0LFxCEgpqOnoefiSAMTACKlooblkwGkwAcQAnUllKTAARUVJJCGUGWgA3FgBrBgysyq58wtLyypqRVXlYRWVVDQRrd3p3YKt7YPdzfVNDZzcEYN16K28rPWNg8yXNUIiojBx8IjJspOIWZshJAEFycjBZIgAFEosMaQTDRUYKAhKFRIdRaKymejmQwLczLYL2HQ6dyeLaIPSrRH2Kz6HTBPSaQzk8KREDRW5xB6JBjMMDkNo5bh8ASYYSiCT1Rr0FrtTqZKic1JCETieAwsYTaGgaaYzT0TR2YwWQzIpZ6XEIfGqw5+TwHcyePRXWk3WL3BICSR05ikGgwCDg8aQyYw6b2PWuRD+cz0UxE-RHdUXYkRGk0FgQOCqOm2+KPZmsdicFLc3kyj0KqYePaaM7k07k-Ha-XBXbzY6mHQHdwUo56HRW5N3VNM5JcpKoOAsXivd1yiFQwszdyk+aLHSo5HIts6asNow+dVkslWeHqjs2ruMgS9yX0LqPXK9ArFMoVaq1fNexWwmaLKxGEymULq0wWBbV2tQl8ewNk8TEv3bGlOwZe0kmzOhHwnH0tFCYIPzMb9fz-YJ9T0AI60OUxsSIojNH3GJD1ghguAAMxoyVEO9JVA39bZNCOeh7FReFtWOdxDB3QxyPpO003oZ4R0Y59fVYxBdnsNVNFWZYKVsP1IOuCiYLEgAVPAAFswBYMQCCkyc-X1Btg1DYl8XMSxiWnYSUyPJJsBKQESjM5CEAsgMDWWeg2yUktpzfezLSgg9tJ7Fk2Q5eCpT5WU5HHJiX2CbVEWA+xvD9VYLlMas1k4+sdysTwiWMZzKLTbzmJmTZ-J0RF7La9q2r8GMwiAA */
  createMachine({
  tsTypes: {} as import("./edit-machine.typegen").Typegen0,
  schema: {
    context: {} as Context,
    events: {} as Events,
    services: {} as Services,
  },
  id: "URL Edit Machine",
  initial: "Choose Online Status",
  states: {
    "Choose Online Status": {
      always: [
        {
          cond: "Is Online",
          target: "#URL Edit Machine.Online",
        },
        {
          cond: "Is Offline",
          target: "#URL Edit Machine.Offline",
        },
        {
          cond: "Is Timed Out",
          target: "#URL Edit Machine.Timeout",
        },
        {
          cond: "Is Moved",
          target: "#URL Edit Machine.Moved",
        },
        {
          cond: "Is Error",
          target: "#URL Edit Machine.Error",
        },
      ],
    },
    Online: {
      tags: "Online",
      initial: "Fetching Open Graph Data",
      states: {
        Resolved: {},
        "Fetching Open Graph Data": {
          tags: ["Loading", "Open Graph Data"],
          invoke: {
            id: "Fetch Open Graph Data",
            src: "Fetch Open Graph Data",
            onDone: [
              {
                actions: ["Assign Open Graph Data", "Report New Value"],
                target: "#URL Edit Machine.Online.Resolved",
              },
            ],
          },
        },
      },
    },
    Offline: {
      tags: "Offline"
    },
    Moved: {
      tags: "Moved",
      on: {
        "Accept Proposed URL": {
          actions: "Assign Proposed URL",
          target: "#URL Edit Machine.Checking Online Status",
        },
      },
    },
    Timeout: {
      tags: "Timeout"
    },
    Error: {
      tags: "Error"
    },
    "Checking Online Status": {
      tags: ["Loading", "Online Status"],
      invoke: {
        id: "Fetch Online Status",
        src: "Fetch Online Status",
        onDone: [
          {
            actions: ["Assign Online Status", "Report New Value"],
            target: "#URL Edit Machine.Choose Online Status",
          },
        ],
      },
    },
  },
  on: {
    "URL Changed": {
      actions: "Assign URL",
      target: "#URL Edit Machine.Checking Online Status",
    },
  },
});
