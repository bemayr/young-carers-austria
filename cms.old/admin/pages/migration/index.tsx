// admin/pages/custom-page.tsx
/** @jsxRuntime classic */
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@keystone-ui/core";
import { PageContainer } from "@keystone-6/core/admin-ui/components";
import { Heading } from "@keystone-ui/core";
import { useKeystone } from "@keystone-6/core/admin-ui/context";
import { useApolloClient } from "@keystone-6/core/admin-ui/apollo";

export default function FavoritesPage() {
  const test = useKeystone();
  const client = useApolloClient();

  return (
    <PageContainer
      header={<Heading type="h3">Favoriten</Heading>}
      title="Favoriten"
    >
      <p>Dieses Feature ist leider noch nicht implementiert... 😢</p>
    </PageContainer>
  );
}
