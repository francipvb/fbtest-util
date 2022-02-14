import { Box } from "@material-ui/core";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { FirebaseAppProvider } from "reactfire";
import { useApp } from "../firebaseAppList/hooks";
function FirebaseAppViewLayout() {
  return (
    <Box>
      <nav>
        <NavLink to="">Overview</NavLink>
      </nav>
      <Outlet />
    </Box>
  );
}
export function AppRoute() {
  const { id } = useParams();
  const appID = Number.parseInt(id ?? "") ?? 0;
  const app = useApp(appID);
  if (!app) {
    return (
      <div>
        <p>The app with AppID {id} could not be found.</p>
      </div>
    );
  }
  return (
    <FirebaseAppProvider appName={app.name} firebaseConfig={app.options}>
      <FirebaseAppViewLayout />
    </FirebaseAppProvider>
  );
}
