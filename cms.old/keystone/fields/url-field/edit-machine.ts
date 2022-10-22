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
  /** @xstate-layout N4IgpgJg5mDOIC5QFUBKAZABAUQgSwBdMBZAQwGMALPAOzADoBhSgexdjEwHkaAbWzgGUCpAgFdYAYkSgADu0J4WNGSAAeiAIwAmABz0AnNoAMANgMB2Tbu2bjmzQBoQATy27j9e9tOnjAFl8DUwBWbQBfcOc0LFxCEgpqOnoefmSAMTACKlooblkwGkwAcQAnUllKTAARUVJJCGUGWgA3FgBrBkzsqq4CorKKqtqRVXlYRWVVDQQAZl0DelmHU2XNAxDNENntC2c3BA9F3wsPAPnjCz1I6IwcfCIyHOTiFhbISQBBcnIwWSIAAqlFjjSCYGJjBQEJQqJDqLRbUz0Gz+VH2XTzU77RAhQL0EKmBy6fzzAw6fwWG4gGL3eJPJIMZhgcjtXLcPgCTDCUQSBpNeitDpdLJUdlpIQicTwOHjSaw0AzCmebQGEkhYlk5b+XTYhAhEL0UzabT+MI2FUGYybKk0uKPRICSQ05ikGgwCCQibQqZwmZEpGzVaaCwGDFG3ZOVyIPxLdXBEJXCz+HwBSJREA0FgQOCqW0PBLPRmsdicVKc7lSz1y6aIEP0fyaVZGK7Eqzq3UGRZxswm4MW4wGG13O0FhkpDnJVBwFi8d4emVQmE1hCmCyzJYOEMWYxazt7KOHfyLNdGbT6-z2MymIexfP0gTj8X0brPPJ9QolcqVGp1Kve+XwocFj0NYq67HoHgovuBwovQ2izEY1jrJ2wSDumeZ0g6yRlnQf5Lr60brqBiYQcYKK+Lqa7+Iaq4eCStimg4N60vahYpAAZux4p4T6CqIJqhpkQsRp+HY-i6sSSIhKeZ7qsGGz+MxI73i8byQDxAF+uS9Z+LMuKhvqGI6gexL6KsyZmGYybJte6HDneWEMAAKngAC2YAsGIBAacumizHiVrqrM266ASYkSUecEGDsCbrBGyxKQ5bHYKUwKlD5BEIFsJqGhYYRnqYuhJke0GIKFyqdvBjYFX4tm3LemFsUyLJsjhEo8tKciLrxgEODlVyzOiGyaBe2y6oNmiGPMRX2NJ8F5YljUMhlfFzIsxHgbokEmhRB4ALTLEsFh5Xpuh2IS0mrmm4RAA */
  createMachine({
  tsTypes: {} as import("./edit-machine.typegen").Typegen0,
  schema: {
    context: {} as Context,
    events: {} as Events,
    services: {} as Services,
  },
  predictableActionArguments: true,
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
            actions: ["Assign Online Status", "Clear Open Graph Data", "Report New Value"],
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
