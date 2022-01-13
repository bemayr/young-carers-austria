/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';

import { Fragment } from 'react';
import { NavigationContainer, NavItem, ListNavItems, ListNavItem } from '@keystone-6/core/admin-ui/components';
import type { NavigationProps } from '@keystone-6/core/admin-ui/components';
import { useRouter } from 'next/router';
import { localizedViaDescription } from '../../keystone-fixes/lists';

// code adapted from: https://github.com/keystonejs/keystone/blob/abeceaf902c231aabe9cf3a383ecf29c09b8f4dd/packages/keystone/src/admin-ui/components/Navigation.tsx#L181-L191
function LocalizedListNavItems({ lists }: Pick<NavigationProps, 'lists'>): jsx.JSX.Element {
  return <Fragment>
    {lists.map(list => <NavItem href={`/${list.path}`} key={list.path}>{localizedViaDescription(list)}</NavItem>)}
  </Fragment>
}

function redirectToCustomDashboardIfNecessary() {
  const router = useRouter()
  if (router.pathname === '/') router.replace('/dashboard')
}

export function Navigation({ authenticatedItem, lists }: NavigationProps) {

  // [TODO]: remove this call and the function once keystone supports customizing the base route
  redirectToCustomDashboardIfNecessary();
  
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/dashboard">Übersicht</NavItem>
      <LocalizedListNavItems lists={lists} />
    </NavigationContainer>
  )
}
