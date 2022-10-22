// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.Fetch Online Status": {
      type: "done.invoke.Fetch Online Status";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Fetch Open Graph Data": {
      type: "done.invoke.Fetch Open Graph Data";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Fetch Online Status": {
      type: "error.platform.Fetch Online Status";
      data: unknown;
    };
    "error.platform.Fetch Open Graph Data": {
      type: "error.platform.Fetch Open Graph Data";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "Fetch Online Status": "done.invoke.Fetch Online Status";
    "Fetch Open Graph Data": "done.invoke.Fetch Open Graph Data";
  };
  missingImplementations: {
    actions:
      | "Assign URL"
      | "Assign Open Graph Data"
      | "Report New Value"
      | "Assign Proposed URL"
      | "Assign Online Status"
      | "Clear Open Graph Data";
    services: "Fetch Open Graph Data" | "Fetch Online Status";
    guards:
      | "Is Online"
      | "Is Offline"
      | "Is Timed Out"
      | "Is Moved"
      | "Is Error";
    delays: never;
  };
  eventsCausingActions: {
    "Assign Online Status": "done.invoke.Fetch Online Status";
    "Assign Open Graph Data": "done.invoke.Fetch Open Graph Data";
    "Assign Proposed URL": "Accept Proposed URL";
    "Assign URL": "URL Changed";
    "Clear Open Graph Data": "done.invoke.Fetch Online Status";
    "Report New Value":
      | "done.invoke.Fetch Online Status"
      | "done.invoke.Fetch Open Graph Data";
  };
  eventsCausingServices: {
    "Fetch Online Status": "Accept Proposed URL" | "URL Changed";
    "Fetch Open Graph Data": "";
  };
  eventsCausingGuards: {
    "Is Error": "";
    "Is Moved": "";
    "Is Offline": "";
    "Is Online": "";
    "Is Timed Out": "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "Checking Online Status"
    | "Choose Online Status"
    | "Error"
    | "Moved"
    | "Offline"
    | "Online"
    | "Online.Fetching Open Graph Data"
    | "Online.Resolved"
    | "Timeout"
    | { Online?: "Fetching Open Graph Data" | "Resolved" };
  tags:
    | "Error"
    | "Loading"
    | "Moved"
    | "Offline"
    | "Online"
    | "Online Status"
    | "Open Graph Data"
    | "Timeout";
}
