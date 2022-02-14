import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { load } from "./firebaseAppSlize";
import { useAppList } from "./hooks";

import { App } from "./model";
export function AppListComponent(props: { appList: App[] }) {
  const itemMapper = (app: App) => (
    <li key={app.id}>
      <NavLink to={`${app.id}`}>{app.name}</NavLink>
      {app.description && <p>{app.description}</p>}
    </li>
  );
  return <ul>{props.appList.map(itemMapper)}</ul>;
}

export default function AppListRoute() {
  const appList = useAppList();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (appList.length == 0) {
      dispatch(load());
    }
  }, [appList]);
  return (
    <div>
      <AppListComponent appList={appList} />
      <Outlet />
    </div>
  );
}
