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

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  forceValidation,
}: FieldProps<typeof controller>) => {
  const { typography, fields } = useTheme();
  const [shouldShowErrors, setShouldShowErrors] = useState(false);

  async function urlChanged(url: string) {
    console.log(url);

    fetch(`/link/validate?url=${url}`)
      .then((response) => response.json())
      .then((data) => console.log(data));

    fetch(`/opengraph/processed?url=${url}`)
      .then((response) => response.json())
      .then((data) => console.log(data));

    onChange!({
      ...value,
      url,
    });
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
            onChange={(event) => urlChanged(event.target.value)}
            value={value.url ?? ""}
            disabled={false}
            onBlur={() => {
              setShouldShowErrors(true);
            }}
          />
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
            placeholder={value.openGraphData?.title}
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
            placeholder={value.openGraphData?.description}
          />
          <pre>{JSON.stringify(value.onlineStatus, null, 2)}</pre>
          <pre>{JSON.stringify(value.openGraphData, null, 2)}</pre>
          { value.openGraphData?.imageUrl && <img src={value.openGraphData.imageUrl} alt={value.openGraphData.imageAlt} width={300}></img> }
          { value.openGraphData?.favicon && <img src={value.openGraphData.favicon} alt="favicon"></img> }
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
      console.log({urlValue})
      return {...urlValue, openGraphData: JSON.parse(urlValue.openGraphData)};
    },
    defaultValue: {},
    serialize: ({ url, onlineStatus, openGraphData, title, description }) => ({
      [config.path]: {
        url,
        onlineStatus: "",
        openGraphData: "",
        title,
        description,
      },
    }),
  };
};
