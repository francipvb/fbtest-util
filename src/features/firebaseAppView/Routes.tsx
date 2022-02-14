import { Route } from "react-router-dom";

export function AppSectionRoutes(props: { prefix: string }) {
  return (
    <Route path=":id" element={<AppRoute />}>
      <Route index element={<AppOverview />} />
    </Route>
  );
}
