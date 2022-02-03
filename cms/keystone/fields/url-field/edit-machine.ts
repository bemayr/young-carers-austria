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
  /** @xstate-layout N4IgpgJg5mDOIC5QFUBKAZABAUQgSwBdMBZAQwGMALPAOzADoBJGwvUgGwGJFQAHAe1it+NHiAAeiAIwA2AEz0ZAZiUBOOatUBWGVKUAOKQBoQAT0QB2ACwL9WiwAYrVmVrlXDAX08m0WXIQkFNR09ADyNOy0DIwQ7GDcSCACQgR4ImKSCFIO9vQWdjL6jlIWWvoVJuYIqjn0UjYWcg4OFrIe3r4YOPhEZFTR4ZGDAGJgBAM0UJhhvGA0mADiAE6kvJSYACKkBKScECIMtABu-ADWDGMTG7PzS6vrWzukYinCoklZOXkFOsUOpXKlTMiH0LXqjSkcikUn0zisFk6ID8PUC-RCDGI-GOkE4AEFyOQwLwiAAFZb8FKQTB+V6Cd6ZaRlegOfTqfRyGQyVlyJQWGRVRC8hz1Lnc1mqBzuBFIlEBPrBQYAYUoYHIZ1o0wiUTomAAyrsCABXWD7Q70E7nS7jKgzYa6g07E101LpD6gLKuVT0AxqNwcqRaVQWVSCmq2ewNZohuSxhwyWXdeVBSYJFEq0hTSAuhmfRA2MMGEVirSlwOqJRyLQypE0fgQOBiOW9FMYpgsNIcHNpDJ5hAFkE1Qz0dlqOT6NTWJqJ-wt9GDbWDWLxbtuxk1Zw+tQqLRKLStVTyMMTqT0OyOFr2OExmeohWpoY663XTUzOYLFZrDbbXar3se6QlCsU9fmUPQrC0WRd2PUofXsAFryUWEZERHxkSTOdFVCRc6D-d0JEQdQRRUCs9z3A8j0HJotHoccdHjBoGisVpb2TedsIAMw4p88PXAdqhhBQ3D5AwrHUIN3CUVjMIfLEcQgXi+34oVq1ooskKDKRNB0aS0SwhgABU8AAWzAfgjQIRSAP7OQw33YsxXkNwykcaxdPvNtsGWCllisgibLDWElB9MEKn3GwNGYqx3NbZVVXVV8cLAfVDWdJI3h7fCsgMGQfQcPcr1cSDVAgwtdHoGw7BcUj42hGL2LAPyvn0OyR00YM2laDwnChbxvCAA */
  createMachine({
  tsTypes: {} as import("./edit-machine.typegen").Typegen0,
  schema: {
    context: {} as Context,
    events: {} as Events,
    services: {} as Services,
  },
  id: "URL Edit Machine",
  initial: "Initial",
  states: {
    Initial: {
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
      initial: "Idle",
      states: {
        Idle: {
          entry: "Report New Value",
          always: {
            cond: "Does Not Have Open Graph Data",
            target: "#URL Edit Machine.Online.Fetching Open Graph Data",
          },
        },
        "Fetching Open Graph Data": {
          invoke: {
            id: "Fetch Open Graph Data",
            src: "Fetch Open Graph Data",
            onDone: [
              {
                actions: "Assign Open Graph Data",
                target: "#URL Edit Machine.Online.Idle",
              },
            ],
          },
        },
      },
    },
    Offline: {},
    Moved: {
      on: {
        "Accept Proposed URL": {
          actions: "Assign Proposed URL",
          target: "#URL Edit Machine.Checking Online Status",
        },
      },
    },
    Timeout: {},
    Error: {},
    "Checking Online Status": {
      invoke: {
        id: "Fetch Online Status",
        src: "Fetch Online Status",
        onDone: [
          {
            actions: "Assign Online Status",
            cond: "Is Online",
            target: "#URL Edit Machine.Online",
          },
          {
            actions: "Assign Online Status",
            cond: "Is Offline",
            target: "#URL Edit Machine.Offline",
          },
          {
            actions: "Assign Online Status",
            cond: "Is Timed Out",
            target: "#URL Edit Machine.Timeout",
          },
          {
            actions: "Assign Online Status",
            cond: "Is Moved",
            target: "#URL Edit Machine.Moved",
          },
          {
            actions: "Assign Online Status",
            cond: "Is Error",
            target: "#URL Edit Machine.Error",
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
