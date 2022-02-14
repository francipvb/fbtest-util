import { Route } from "react-router-dom";
import { AppSectionRoutes } from "../firebaseAppView/Routes";
import AppFormRoute from "./AppForm";
import AppListRoute from "./AppList";

export function AppRoutes(props: { prefix: string }) {
  return (
    <Route path={props.prefix} element={<AppListRoute />}>
      <Route index element={<AppFormRoute />} />
      <AppSectionRoutes prefix=":id" />
    </Route>
  );
}
