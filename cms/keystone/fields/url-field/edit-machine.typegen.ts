// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    "Assign URL": "URL Changed";
    "Assign Open Graph Data": "done.invoke.Fetch Open Graph Data";
    "Assign Proposed URL": "Accept Proposed URL";
    "Assign Online Status": "done.invoke.Fetch Online Status";
    "Report New Value": "done.invoke.Fetch Open Graph Data";
  };
  internalEvents: {
    "done.invoke.Fetch Open Graph Data": {
      type: "done.invoke.Fetch Open Graph Data";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Fetch Online Status": {
      type: "done.invoke.Fetch Online Status";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
    "error.platform.Fetch Open Graph Data": {
      type: "error.platform.Fetch Open Graph Data";
      data: unknown;
    };
    "error.platform.Fetch Online Status": {
      type: "error.platform.Fetch Online Status";
      data: unknown;
    };
  };
  invokeSrcNameMap: {
    "Fetch Open Graph Data": "done.invoke.Fetch Open Graph Data";
    "Fetch Online Status": "done.invoke.Fetch Online Status";
  };
  missingImplementations: {
    actions:
      | "Assign URL"
      | "Assign Open Graph Data"
      | "Assign Proposed URL"
      | "Assign Online Status"
      | "Report New Value";
    services: "Fetch Online Status" | "Fetch Open Graph Data";
    guards:
      | "Is Online"
      | "Is Offline"
      | "Is Timed Out"
      | "Is Moved"
      | "Is Error"
      | "Does Not Have Open Graph Data";
    delays: never;
  };
  eventsCausingServices: {
    "Fetch Online Status": "URL Changed" | "Accept Proposed URL";
    "Fetch Open Graph Data": "";
  };
  eventsCausingGuards: {
    "Is Online": "" | "done.invoke.Fetch Online Status";
    "Is Offline": "" | "done.invoke.Fetch Online Status";
    "Is Timed Out": "" | "done.invoke.Fetch Online Status";
    "Is Moved": "" | "done.invoke.Fetch Online Status";
    "Is Error": "" | "done.invoke.Fetch Online Status";
    "Does Not Have Open Graph Data": "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "Initial"
    | "Online"
    | "Online.Idle"
    | "Online.Fetching Open Graph Data"
    | "Offline"
    | "Moved"
    | "Timeout"
    | "Error"
    | "Checking Online Status"
    | { Online?: "Idle" | "Fetching Open Graph Data" };
  tags: never;
}
