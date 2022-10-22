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
import { useState, useEffect } from "react";
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
import { createValidUrl } from "../../server/links";
import { Button } from "@keystone-ui/button";

function getOnlineStatus(url: string) {
  return fetch(`/link/validate?url=${url}`).then((response) => response.json());
}

function getOpenGraphData(url: string) {
  return fetch(`/opengraph/processed?url=${url}`).then((response) =>
    response.json()
  );
}

async function getPredefinedPreviewImageUrls() {
  const response = await fetch(
    `https://www.young-carers-austria.at/api/previewImages.json`
  );
  const data = await response.json();
  return data;
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
  const [predefinedPreviewImageUrls, setPredefinedPreviewImageUrls] = useState([]);

  useEffect(() => {
    getPredefinedPreviewImageUrls().then(setPredefinedPreviewImageUrls);
  }, []);

  const [state, send, service] = useMachine(urlEditMachine, {
    actions: {
      "Assign Online Status": assign({
        onlineStatus: (_, result) => result.data,
      }),
      "Assign Open Graph Data": assign({
        openGraphData: (_, result) => result.data,
      }),
      "Clear Open Graph Data": assign({
        openGraphData: (_) => undefined,
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
  const previewImagesUrls = useSelector(
    service,
    (state) =>
      state.context.openGraphData && state.context.openGraphData.imageUrl
      ? [createValidUrl(state.context.openGraphData.imageUrl, state.context.url), ...predefinedPreviewImageUrls]
      : predefinedPreviewImageUrls
  );

  const isOnline = state.hasTag("Online");
  const isNotAvailable = state.hasTag("Offline") || state.hasTag("Error");
  const wasMoved = state.hasTag("Moved");
  const needsAdmin = state.hasTag("Timeout");

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
          {isNotAvailable && (
            <p>
              ⛔ Diese Seite konnte leider nicht gefunden werden, bitte
              überprüfen Sie die Adresse.
            </p>
          )}
          {wasMoved && (
            <Stack>
              <p>
                ➡&nbsp;Die Seite{" "}
                <a href={url} target="_blank">
                  {url}
                </a>{" "}
                wurde nach{" "}
                <a href={movedUrl} target="_blank">
                  {movedUrl}
                </a>{" "}
                verschoben. Bitte überprüfen Sie, ob sich der Inhalt geändert
                hat.{" "}
              </p>
              <Button tone="help" onClick={() => send("Accept Proposed URL")}>
                <i>{movedUrl}</i> übernehmen
              </Button>
            </Stack>
          )}
          {needsAdmin && (
            <p>
              👨‍💻 Irgendetwas stimmt hier nicht, bitte wenden Sie sich an{" "}
              <a href="mailto:yc-support@youngcarers.at">
                yc-support@youngcarers.at
              </a>
            </p>
          )}
          <FieldLabel>Titel</FieldLabel>
          <TextInput
            id={field.path}
            // autoFocus={autoFocus}
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
            // autoFocus={autoFocus}
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


<fieldset>
<legend><FieldLabel>Titelbild</FieldLabel></legend>
          {
            previewImagesUrls.map(url => <div>
              <input
              type="radio"
              name="titleImage"
              id={`titleImage(${url})`}
              value={url}
              onChange={(event) => {
                onChange({
                  ...value,
                  previewImageUrl: event.target.value
                })
              }}
              checked={value.previewImageUrl === url} />
            <label htmlFor={`titleImage(${url})`}>
            <img
                src={url}
                alt="Preview Image"
                height={160}
              ></img>
            </label>
            </div>)
          }
</fieldset>
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
      previewImageUrl
    }`,
    deserialize: (data) => {
      const urlValue = data[config.path];
      console.log({ urlValue });
      return { ...urlValue, openGraphData: JSON.parse(urlValue.openGraphData) };
    },
    defaultValue: {},
    serialize: ({ url, onlineStatus, openGraphData, title, description, previewImageUrl }) => ({
      [config.path]: {
        url,
        onlineStatus: JSON.stringify(onlineStatus),
        openGraphData: JSON.stringify(openGraphData),
        title,
        description,
        previewImageUrl,
      },
    }),
  };
};
