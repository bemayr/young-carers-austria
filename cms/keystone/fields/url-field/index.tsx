import {
  BaseListTypeInfo,
  CommonFieldConfig,
  fieldType,
  orderDirectionEnum,
  FieldTypeFunc,
  filters,
  KeystoneContext,
} from "@keystone-6/core/types";
import { graphql } from "@keystone-6/core";
import {
  getOnlineStatus,
  Moved,
  Offline,
  Online,
  OnlineStatus,
  Timeout,
  Error,
} from "../../server/dead-link-dedection";

// ================== TYPES ==================
export type UrlFieldConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo> & {
    isIndexed?: true | "unique";
  };

export type UrlType = {
  url: string;
  onlineStatus: OnlineStatus;
  openGraphData: OpenGraphData;
  title: string | null;
  description: string | null;
};

type OpenGraphData = {
  title?: string;
  type?: string;
  siteName?: string;
  description?: string;
  imageUrl?: string;
};

const UrlOnline = graphql.object<Online>()({
  name: "UrlOnline",
  fields: {
    url: graphql.field({ type: graphql.nonNull(graphql.String) }),
    status: graphql.field({ type: graphql.nonNull(graphql.String) }),
  },
});
const UrlOffline = graphql.object<Offline>()({
  name: "UrlOffline",
  fields: {
    url: graphql.field({ type: graphql.nonNull(graphql.String) }),
    status: graphql.field({ type: graphql.nonNull(graphql.String) }),
    statusCode: graphql.field({ type: graphql.Int }),
  },
});
const UrlMoved = graphql.object<Moved>()({
  name: "UrlMoved",
  fields: {
    url: graphql.field({ type: graphql.nonNull(graphql.String) }),
    status: graphql.field({ type: graphql.nonNull(graphql.String) }),
    statusCode: graphql.field({ type: graphql.Int }),
    location: graphql.field({ type: graphql.String }),
  },
});
const UrlTimeout = graphql.object<Timeout>()({
  name: "UrlTimeout",
  fields: {
    url: graphql.field({ type: graphql.nonNull(graphql.String) }),
    status: graphql.field({ type: graphql.nonNull(graphql.String) }),
  },
});
const UrlError = graphql.object<Error>()({
  name: "UrlError",
  fields: {
    url: graphql.field({ type: graphql.nonNull(graphql.String) }),
    status: graphql.field({ type: graphql.nonNull(graphql.String) }),
    error: graphql.field({
      type: graphql.nonNull(graphql.String),
      resolve: ({ error }) => `${error}`,
    }),
  },
});
const UrlOnlineStatus = graphql.union({
  name: "UrlOnlineStatus",
  types: [UrlOnline, UrlOffline, UrlMoved, UrlTimeout, UrlError],
  resolveType({ status }) {
    switch (status) {
      case "online":
        return UrlOnline.graphQLType.name;
      case "offline":
        return UrlOffline.graphQLType.name;
      case "moved":
        return UrlMoved.graphQLType.name;
      case "timeout":
        return UrlTimeout.graphQLType.name;
      case "error":
        return UrlError.graphQLType.name;
      default:
        return UrlError.graphQLType.name;
    }
  },
});

// ================== GRAPHQL ==================
// --- Input ---
const UrlFieldInput = graphql.inputObject({
  name: "UrlFieldInput",
  fields: {
    url: graphql.arg({ type: graphql.String }),
    onlineStatus: graphql.arg({ type: graphql.String }),
    title: graphql.arg({ type: graphql.String }),
    description: graphql.arg({ type: graphql.String }),
  },
});

type UrlFieldInputType =
  | undefined
  | null
  | {
      url?: string | null;
      onlineStatus?: string | null;
      title?: string | null;
      description?: string | null;
    };

async function inputResolver(
  data: UrlFieldInputType,
  context: KeystoneContext
) {
  // if (data === null || data === undefined) {
  //   return {
  //     url: data,
  //     onlineStatus: data,
  //     title: data,
  //     description: data,
  //   };
  // }

  const resolved = {
    url: "",
    onlineStatus: "",
    openGraphData: "",
    title: "",
    description: "",
    ...data
  }

  console.info({inputResolver: resolved});

  console.log("test")

  return resolved;

  // if (data.onlineStatus === undefined && data.url !== undefined && data.url !== null) {
  //   console.log("get online status");
  //   const onlineStatus = await getOnlineStatus(data.url);
  //   return { ...data, onlineStatus: JSON.stringify(onlineStatus), openGraphData: "" };
  // } else {
  //   return {...data, openGraphData: ""};
  // }
}

const UrlFieldOutput = graphql.object<UrlType>()({
  name: "UrlFieldOutput",
  fields: graphql.fields<UrlType>()({
    url: graphql.field({ type: graphql.String }),
    onlineStatus: graphql.field({
      type: UrlOnlineStatus,
      // resolve: ({onlineStatus}) => JSON.parse(onlineStatus),
    }),
    openGraphData: graphql.field({
      type: graphql.String,
      resolve: ({ openGraphData }) => "",
    }),
    title: graphql.field({ type: graphql.String }),
    description: graphql.field({ type: graphql.String }),
  }),
});

export const url =
  <ListTypeInfo extends BaseListTypeInfo>({
    isIndexed,
    ...config
  }: UrlFieldConfig<ListTypeInfo> = {}): FieldTypeFunc<ListTypeInfo> =>
  (meta) => {
    // [TODO]: fix this using https://github.com/keystonejs/keystone/blob/abeceaf902c231aabe9cf3a383ecf29c09b8f4dd/packages/keystone/src/lib/utils.ts
    const fieldLabel = config.label ?? meta.fieldKey; //humanize(meta.fieldKey);

    // [TODO]: fix this using https://github.com/keystonejs/keystone/blob/4d7483d9bbd6a4213f7100e6624367f6a0953b68/packages/keystone/src/fields/non-null-graphql.ts
    // assertReadIsNonNullAllowed(meta, config, isNullable);
    // assertCreateIsNonNullAllowed(meta, config);

    return fieldType({
      kind: "multi",
      fields: {
        url: {
          kind: "scalar",
          mode: "optional",
          scalar: "String",
          default: undefined,
          index: isIndexed === true ? "index" : isIndexed || undefined,
        },
        onlineStatus: {
          kind: "scalar",
          mode: "optional",
          scalar: "String",
        },
        openGraphData: {
          kind: "scalar",
          mode: "optional",
          scalar: "String",
        },
        title: {
          kind: "scalar",
          mode: "optional",
          scalar: "String",
        },
        description: {
          kind: "scalar",
          mode: "optional",
          scalar: "String",
        },
      },
    })({
      ...config,
      hooks: {
        ...config.hooks,
        async validateInput(args) {
          // [TODO]: validate URL
          await config.hooks?.validateInput?.(args);
        },
      },
      input: {
        create: {
          arg: graphql.arg({ type: UrlFieldInput }),
          resolve: inputResolver,
        },
        update: {
          arg: graphql.arg({ type: UrlFieldInput }),
          resolve: inputResolver,
        },
      },
      output: graphql.field({
        type: UrlFieldOutput,
        resolve({
          value: { url, onlineStatus, openGraphData, title, description },
        }) {
          console.log({output: url})
          return {
            url: url ?? "",
            onlineStatus: onlineStatus && JSON.parse(onlineStatus),
            openGraphData: openGraphData && JSON.parse(openGraphData),
            title: title,
            description: description,
          };
          // // return value as unknown as UrlType;
        },
      }),
      views: require.resolve("./views"),
    });
  };

export type TextFieldMeta = {};
