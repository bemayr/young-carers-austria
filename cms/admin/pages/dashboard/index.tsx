/** @jsxRuntime classic */
/** @jsx jsx */

// This page is adapted from: https://github.com/keystonejs/keystone/blob/30fc08b515e4f8851fd2583a265a813c683bf604/packages/keystone/src/___internal-do-not-use-will-break-in-patch/admin-ui/pages/HomePage/index.tsx

import { ButtonHTMLAttributes, useMemo, useState, Fragment } from "react";

import {
  Center,
  Inline,
  Heading,
  VisuallyHidden,
  jsx,
  useTheme,
  H4,
  Stack,
  Box,
} from "@keystone-ui/core";
import { PlusIcon } from "@keystone-ui/icons/icons/PlusIcon";
import { DrawerController } from "@keystone-ui/modals";
import { LoadingDots } from "@keystone-ui/loading";

import { makeDataGetter } from "@keystone-6/core/admin-ui/utils";
import {
  CellLink,
  CreateItemDrawer,
  PageContainer,
} from "@keystone-6/core/admin-ui/components/";
import { gql, useQuery } from "@keystone-6/core/admin-ui/apollo";
import { useKeystone, useList } from "@keystone-6/core/admin-ui/context";
import { useRouter, Link } from "@keystone-6/core/admin-ui/router";
import { localizedViaDescription } from "../../../keystone-fixes/lists";
import {
  TableBodyCell,
  TableContainer,
  TableHeaderCell,
  TableHeaderRow,
} from "./list";
import { UrlType } from "../../../keystone/fields/url-field";
import { OnlineStatus } from "../../../keystone/server/links";

type ListCardProps = {
  listKey: string;
  hideCreate: boolean;
  count:
    | { type: "success"; count: number }
    | { type: "no-access" }
    | { type: "error"; message: string }
    | { type: "loading" };
};

const ListCard = ({ listKey, count, hideCreate }: ListCardProps) => {
  const { colors, palette, radii, spacing } = useTheme();
  const list = useList(listKey);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();
  return (
    <div css={{ position: "relative" }}>
      <Link
        href={`/${list.path}`}
        css={{
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderRadius: radii.medium,
          borderWidth: 1,
          // boxShadow: shadow.s100,
          display: "inline-block",
          minWidth: 280,
          padding: spacing.large,
          textDecoration: "none",

          ":hover": {
            borderColor: palette.blue400,
          },
          ":hover h3": {
            textDecoration: "underline",
          },
        }}
      >
        <h3 css={{ margin: `0 0 ${spacing.small}px 0` }}>
          {localizedViaDescription(list)}{" "}
        </h3>
        {count.type === "success" ? (
          <span css={{ color: colors.foreground, textDecoration: "none" }}>
            {count.count} {count.count === 1 ? "Eintrag" : "Einträge"}
          </span>
        ) : count.type === "error" ? (
          count.message
        ) : count.type === "loading" ? (
          <LoadingDots
            label={`Loading count of ${list.plural}`}
            size="small"
            tone="passive"
          />
        ) : (
          "No access"
        )}
      </Link>
      {hideCreate === false && (
        <CreateButton
          title={`Create ${list.singular}`}
          disabled={isCreateModalOpen}
          onClick={() => {
            setIsCreateModalOpen(true);
          }}
        >
          <PlusIcon size="large" />
          <VisuallyHidden>Create {list.singular}</VisuallyHidden>
        </CreateButton>
      )}
      <DrawerController isOpen={isCreateModalOpen}>
        <CreateItemDrawer
          listKey={list.key}
          onCreate={({ id }) => {
            router.push(`/${list.path}/${id}`);
          }}
          onClose={() => {
            setIsCreateModalOpen(false);
          }}
        />
      </DrawerController>
    </div>
  );
};

const CreateButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const theme = useTheme();
  return (
    <button
      title="Create"
      css={{
        alignItems: "center",
        backgroundColor: theme.palette.neutral400,
        border: 0,
        borderRadius: theme.radii.xsmall,
        color: "white",
        cursor: "pointer",
        display: "flex",
        height: 32,
        justifyContent: "center",
        outline: 0,
        position: "absolute",
        right: theme.spacing.large,
        top: theme.spacing.large,
        transition: "background-color 80ms linear",
        width: 32,

        "&:hover, &:focus": {
          backgroundColor: theme.tones.positive.fill[0],
        },
      }}
      {...props}
    />
  );
};

export const HomePage = () => {
  const {
    adminMeta: { lists },
    visibleLists,
  } = useKeystone();
  const query = useMemo(
    () => gql`
    query {
      keystone {
        adminMeta {
          lists {
            key
            hideCreate
          }
        }
      }
      ${Object.entries(lists)
        .map(
          ([listKey, list]) => `${listKey}: ${list.gqlNames.listQueryCountName}`
        )
        .join("\n")}
    }`,
    [lists]
  );
  let { data, error } = useQuery(query, { errorPolicy: "all" });

  const dataGetter = makeDataGetter(data, error?.graphQLErrors);

  const { data: linksData, error: linksError } = useQuery(
    gql`
      query {
        references(
          where: { onlineStatus: { in: [offline, timeout, error, moved] } }
          orderBy: { onlineStatus: asc }
        ) {
          id
          url
          title
          description
          onlineStatus
          address {
            title
          }
        }
      }
    `,
    { errorPolicy: "all" }
  );

  return (
    <PageContainer
      header={<Heading type="h3">Übersicht</Heading>}
      title="Übersicht"
    >
      <Stack marginTop="large">
        <Stack>
          <H4>Inhalte</H4>
          {visibleLists.state === "loading" ? (
            <Center css={{ height: "100%" }}>
              <LoadingDots label="Loading lists" size="large" tone="passive" />
            </Center>
          ) : (
            <Inline
              as="ul"
              gap="large"
              paddingY="xlarge"
              css={{
                paddingLeft: "0px",
                marginBottom: "0px",
              }}
            >
              {(() => {
                if (visibleLists.state === "error") {
                  return (
                    <span css={{ color: "red" }}>
                      {visibleLists.error instanceof Error
                        ? visibleLists.error.message
                        : visibleLists.error[0].message}
                    </span>
                  );
                }
                return Object.keys(lists).map((key) => {
                  if (!visibleLists.lists.has(key)) {
                    return null;
                  }
                  const result = dataGetter.get(key);
                  return (
                    <ListCard
                      count={
                        data
                          ? result.errors
                            ? {
                                type: "error",
                                message: result.errors[0].message,
                              }
                            : { type: "success", count: data[key] }
                          : { type: "loading" }
                      }
                      hideCreate={
                        data?.keystone.adminMeta.lists.find(
                          (list: any) => list.key === key
                        )?.hideCreate ?? false
                      }
                      key={key}
                      listKey={key}
                    />
                  );
                });
              })()}
            </Inline>
          )}
        </Stack>
        <Stack>
          <H4>Referenzen</H4>
          {linksData !== undefined ? (
            <Box paddingBottom="xlarge">
              <TableContainer>
                <TableHeaderRow>
                  {["Status", "Eintrag", "Adresse"].map((label) => (
                    <TableHeaderCell key={label}>{label}</TableHeaderCell>
                  ))}
                </TableHeaderRow>
                <tbody>
                  {linksData?.references?.map(
                    (
                      d: {
                        title: string;
                        onlineStatus:
                          | "online"
                          | "offline"
                          | "timeout"
                          | "error"
                          | "moved";
                        url: string;
                        id: string;
                      },
                      i: number
                    ) => (
                      <tr key={i}>
                        {status(d.onlineStatus)}
                        <TableBodyCell css={{ padding: 8 }}>
                          <CellLink
                            href={`/references/[id]`}
                            as={`/references/${encodeURIComponent(d.id)}`}
                          >
                            {d.title}
                          </CellLink>
                        </TableBodyCell>
                        <TableBodyCell css={{ padding: 8 }}>
                          <CellLink
                            href={`/references/[id]`}
                            as={`/references/${encodeURIComponent(d.id)}`}
                          >
                            {d.url}
                          </CellLink>
                        </TableBodyCell>
                      </tr>
                    )
                  )}
                </tbody>
              </TableContainer>
            </Box>
          ) : null}
        </Stack>
      </Stack>
    </PageContainer>
  );
};

function status(
  onlineStatus: "online" | "offline" | "timeout" | "error" | "moved"
) {
  if (onlineStatus === "offline")
    return <TableBodyCell css={{ color: "red", padding: 8, textAlign: "center" }}>⛔ offline</TableBodyCell>;
  if (onlineStatus === "moved")
    return <TableBodyCell css={{ color: "orange", padding: 8, textAlign: "center" }}>⚠ verschoben</TableBodyCell>;
  return <TableBodyCell css={{ color: "purple", padding: 8, textAlign: "center" }}>👨‍💻 {onlineStatus}</TableBodyCell>;
}

export default HomePage;
