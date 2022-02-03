// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    "Assign URL": "URL Changed";
    "Assign Open Graph Data": "done.invoke.Fetch Open Graph Data";
    "Report New Value":
      | "done.invoke.Fetch Open Graph Data"
      | "done.invoke.Fetch Online Status";
    "Assign Proposed URL": "Accept Proposed URL";
    "Assign Online Status": "done.invoke.Fetch Online Status";
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
      | "Report New Value"
      | "Assign Proposed URL"
      | "Assign Online Status";
    services: "Fetch Online Status" | "Fetch Open Graph Data";
    guards:
      | "Is Online"
      | "Is Offline"
      | "Is Timed Out"
      | "Is Moved"
      | "Is Error";
    delays: never;
  };
  eventsCausingServices: {
    "Fetch Online Status": "URL Changed" | "Accept Proposed URL";
    "Fetch Open Graph Data": "xstate.init";
  };
  eventsCausingGuards: {
    "Is Online": "";
    "Is Offline": "";
    "Is Timed Out": "";
    "Is Moved": "";
    "Is Error": "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "Choose Online Status"
    | "Online"
    | "Online.Resolved"
    | "Online.Fetching Open Graph Data"
    | "Offline"
    | "Moved"
    | "Timeout"
    | "Error"
    | "Checking Online Status"
    | { Online?: "Resolved" | "Fetching Open Graph Data" };
  tags:
    | "Online"
    | "Loading"
    | "Open Graph Data"
    | "Offline"
    | "Moved"
    | "Timeout"
    | "Error"
    | "Online Status";
}
