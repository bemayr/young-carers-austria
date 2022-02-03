/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Stack, useTheme } from "@keystone-ui/core";
import {
  Checkbox,
  FieldContainer,
  FieldLabel,
  TextArea,
  TextInput,
} from "@keystone-ui/fields";
import { useState } from "react";
import {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from "@keystone-6/core/types";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";
import { UrlType } from ".";
import { useMachine, useSelector } from "@xstate/react";
import { urlEditMachine } from "./edit-machine";
import { assign } from "xstate";

function getOnlineStatus(url: string) {
  return fetch(`/link/validate?url=${url}`).then((response) => response.json());
}

function getOpenGraphData(url: string) {
  return fetch(`/opengraph/processed?url=${url}`).then((response) =>
    response.json()
  );
}

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  forceValidation,
}: FieldProps<typeof controller>) => {
  const { typography, fields } = useTheme();
  const [shouldShowErrors, setShouldShowErrors] = useState(false);

  const [state, send, service] = useMachine(urlEditMachine, {
    actions: {
      "Assign Online Status": assign({
        onlineStatus: (_, result) => result.data,
      }),
      "Assign Open Graph Data": assign({
        openGraphData: (_, result) => result.data,
      }),
      "Assign URL": assign({
        url: (_, event) => event.url,
      }),
      "Assign Proposed URL": assign({
        url: (context) => {
          if (context.onlineStatus?.status === "moved")
            return context.onlineStatus.location!;
          else throw new Error("Da ist etwas schief gelaufen...");
        },
      }),
      "Report New Value": (context) => {
        console.log("Reporting New Value");
        onChange!({ ...value, ...context });
      },
    },
    guards: {
      "Is Online": ({ onlineStatus }) => onlineStatus?.status === "online",
      "Is Offline": ({ onlineStatus }) => onlineStatus?.status === "offline",
      "Is Moved": ({ onlineStatus }) => onlineStatus?.status === "moved",
      "Is Timed Out": ({ onlineStatus }) => onlineStatus?.status === "timeout",
      "Is Error": ({ onlineStatus }) => onlineStatus?.status === "error",
    },
    services: {
      "Fetch Online Status": ({ url }) => getOnlineStatus(url),
      "Fetch Open Graph Data": ({ url }) => getOpenGraphData(url),
    },
    context: {
      url: value.url,
      onlineStatus: value.onlineStatus,
      openGraphData: value.openGraphData,
    },
  });

  const url = useSelector(service, (state) => state.context.url);
  const movedUrl = useSelector(service, (state) =>
    state.context.onlineStatus?.status === "moved"
      ? state.context.onlineStatus?.location
      : undefined
  );
  const ogTitle = useSelector(
    service,
    (state) => state.context.openGraphData && state.context.openGraphData.title
  );
  const ogDescription = useSelector(
    service,
    (state) =>
      state.context.openGraphData && state.context.openGraphData.description
  );
  const ogFavicon = useSelector(
    service,
    (state) =>
      state.context.openGraphData && state.context.openGraphData.favicon
  );
  const ogImageUrl = useSelector(
    service,
    (state) =>
      state.context.openGraphData && state.context.openGraphData.imageUrl
  );
  const ogImageAlt = useSelector(
    service,
    (state) =>
      state.context.openGraphData && state.context.openGraphData.imageAlt
  );

  const isOnline = state.hasTag("Online");
  const isOffline = state.hasTag("Offline");
  const wasMoved = state.hasTag("Moved");
  const needsAdmin = state.hasTag("Timeout") || state.hasTag("Error");

  function getImgSrc(passedUrl: string, passedBaseUrl: string) {
    const baseUrl = new URL(passedBaseUrl);
    return passedUrl.startsWith("/")
      ? `${baseUrl.protocol}//${baseUrl.host}${passedUrl}`
      : passedUrl;
  }

  return (
    <FieldContainer>
      {onChange ? (
        <Stack gap="small">
          <FieldLabel>Adresse</FieldLabel>
          <TextInput
            id={field.path}
            autoFocus={autoFocus}
            type="url"
            onChange={(event) =>
              send({ type: "URL Changed", url: event.target.value })
            }
            value={url}
            disabled={false}
            onBlur={() => {
              setShouldShowErrors(true);
            }}
          />
          {isOnline && <p>✅</p>}
          {isOffline && <p>⛔</p>}
          {wasMoved && (
            <p>
              ➡&nbsp;Die Seite{" "}
              <a href={url} target="_blank">
                {url}
              </a>{" "}
              wurde nach{" "}
              <a href={movedUrl} target="_blank">
                {movedUrl}
              </a>{" "}
              verschoben. Bitte überprüfen Sie, ob sich der Inhalt geändert hat.
              Sollten der Inhalt der neuen Referenz in Ordnung sein, können Sie
              den Link einfach{" "}
              <button onClick={() => send("Accept Proposed URL")} type="button">
                übernehmen.
              </button>
            </p>
          )}
          {needsAdmin &&
            <p>⚠ Bitte kontaktieren Sie den Administrator der Webseite...</p>}
          <FieldLabel>Titel</FieldLabel>
          <TextInput
            id={field.path}
            autoFocus={autoFocus}
            onChange={(event) =>
              onChange({
                ...value,
                title: event.target.value,
              })
            }
            value={value.title ?? ""}
            onBlur={() => {
              setShouldShowErrors(true);
            }}
            placeholder={ogTitle}
          />
          <FieldLabel>Beschreibung</FieldLabel>
          <TextArea
            id={field.path}
            autoFocus={autoFocus}
            onChange={(event) =>
              onChange({
                ...value,
                description: event.target.value,
              })
            }
            value={value.description ?? ""}
            onBlur={() => {
              setShouldShowErrors(true);
            }}
            placeholder={ogDescription}
          />
          {/* <pre>{JSON.stringify(state.value, null, 2)}</pre>
          <pre>{JSON.stringify(state.context, null, 2)}</pre>
          <pre>{JSON.stringify(value.onlineStatus, null, 2)}</pre>
          <pre>{JSON.stringify(value.openGraphData, null, 2)}</pre> */}
          {ogImageUrl && (
            <div>
              <FieldLabel>Titelbild</FieldLabel>
              <img
                src={getImgSrc(ogImageUrl, value.url!)}
                alt={ogImageAlt}
                width={300}
              ></img>
            </div>
          )}
          {ogFavicon && (
            <div>
              <FieldLabel>Icon</FieldLabel>
              <img
                src={getImgSrc(ogFavicon, url!)}
                alt="favicon"
                width={32}
              ></img>
            </div>
          )}
        </Stack>
      ) : null}
    </FieldContainer>
  );
};

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path] + "";
  return linkTo ? (
    <CellLink {...linkTo}>{value}</CellLink>
  ) : (
    <CellContainer>{value}</CellContainer>
  );
};
Cell.supportsLinkTo = true;

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {item[field.path]}
    </FieldContainer>
  );
};

type Config = FieldControllerConfig<undefined>;

type InnerTextValue =
  | { kind: "null"; prev: string }
  | { kind: "value"; value: string };

type UrlValue = Partial<UrlType>;

function deserializeTextValue(value: string | null): InnerTextValue {
  if (value === null) {
    return { kind: "null", prev: "" };
  }
  return { kind: "value", value };
}

export const controller = (
  config: Config
): FieldController<UrlValue, string> => {
  return {
    path: config.path,
    label: config.label,
    graphqlSelection: `${config.path} {
      url
      onlineStatus {
        ... on UrlOnline {
          status
        }
        ... on UrlOffline {
          status
          statusCode
        }
        ... on UrlMoved {
          status
          statusCode
          location
        }
        ... on UrlTimeout {
          status
        }
        ... on UrlError {
          status
          error
        }
      }
      openGraphData
      title
      description
    }`,
    deserialize: (data) => {
      const urlValue = data[config.path];
      console.log({ urlValue });
      return { ...urlValue, openGraphData: JSON.parse(urlValue.openGraphData) };
    },
    defaultValue: {},
    serialize: ({ url, onlineStatus, openGraphData, title, description }) => ({
      [config.path]: {
        url,
        onlineStatus: JSON.stringify(onlineStatus),
        openGraphData: JSON.stringify(openGraphData),
        title,
        description,
      },
    }),
  };
};
