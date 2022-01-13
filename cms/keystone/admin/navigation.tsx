/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';

import { Fragment } from 'react';
import { NavigationContainer, NavItem, ListNavItems, ListNavItem } from '@keystone-6/core/admin-ui/components';
import type { NavigationProps } from '@keystone-6/core/admin-ui/components';

// code adapted from: https://github.com/keystonejs/keystone/blob/abeceaf902c231aabe9cf3a383ecf29c09b8f4dd/packages/keystone/src/admin-ui/components/Navigation.tsx#L181-L191
function LocalizedListNavItems({ lists }: Pick<NavigationProps, 'lists'>): jsx.JSX.Element {
  return <Fragment>
    {lists.map(list => <NavItem href={`/${list.path}`}>{list.description || list.label}</NavItem>)}
  </Fragment>
}

export function Navigation({ authenticatedItem, lists }: NavigationProps) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Übersicht</NavItem>
      <LocalizedListNavItems lists={lists} />
    </NavigationContainer>
  )
}
