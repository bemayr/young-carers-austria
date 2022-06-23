/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@keystone-ui/core";

import { Fragment } from "react";
import {
  NavigationContainer,
  NavItem,
} from "@keystone-6/core/admin-ui/components";
import type { NavigationProps } from "@keystone-6/core/admin-ui/components";
import { useRouter } from "next/router";
import { localizedViaDescription } from "../../keystone/_fixes/lists";

// code adapted from: https://github.com/keystonejs/keystone/blob/abeceaf902c231aabe9cf3a383ecf29c09b8f4dd/packages/keystone/src/admin-ui/components/Navigation.tsx#L181-L191
type NavItemsProps = Pick<NavigationProps, "lists"> & { include?: string[] };
function LocalizedListNavItems({
  lists = [],
  include = [],
}: NavItemsProps): jsx.JSX.Element {
  const renderedLists =
    include.length > 0 ? lists.filter((i) => include.includes(i.key)) : lists;

  return (
    <Fragment>
      {renderedLists.map((list) => (
        <NavItem href={`/${list.path}`} key={list.path}>
          {localizedViaDescription(list)}
        </NavItem>
      ))}
    </Fragment>
  );
}

function redirectToCustomDashboardIfNecessary() {
  const router = useRouter();
  if (router.pathname === "/") router.replace("/dashboard");
}

export function Navigation({ authenticatedItem, lists }: NavigationProps) {
  // [TODO]: remove this call and the function once keystone supports customizing the base route
  redirectToCustomDashboardIfNecessary();

  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/dashboard">Übersicht</NavItem>
      <LocalizedListNavItems lists={lists} include={["Insight"]} />
      <div
        css={{
          color: "#6b7280;",
          padding: "0.75rem 1.5rem",
        }}
      >
        Young Carers ABC
      </div>
      <div css={{ marginLeft: "1rem" }}>
        <LocalizedListNavItems
          lists={lists}
          include={["Category", "Reference", "Owner"]}
        />
      </div>
      <LocalizedListNavItems lists={lists} include={["Emergency"]} />
      <LocalizedListNavItems lists={lists} include={["Singleton"]} />
      <LocalizedListNavItems lists={lists} include={["User"]} />
    </NavigationContainer>
  );
}
