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
              onChange({
                ...value,
                url: event.target.value,
              })
            }
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
            placeholder="something else"
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
            placeholder="something else"
          />
          <p>{JSON.stringify(value.onlineStatus)}</p>
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

type UrlValue = Partial<UrlType>

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
          url
        }
        ... on UrlOffline {
          status
          url
        }
      }
      title
      description
    }`,
    deserialize: (data) => {
      const urlValue = data[config.path]
      return urlValue
    },
    defaultValue: { },
    serialize: ({url, onlineStatus, openGraphData, title, description}) => ({
      [config.path]: {
        url,
        onlineStatus: "",
        // openGraphData: "",
        title,
        description
      },
    }),
  };
};
