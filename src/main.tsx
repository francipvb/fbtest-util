import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App, { OverviewRoute } from "./App";
import { Provider } from "react-redux";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppListRoute from "./features/firebaseAppList/AppList";
import appStore from "./app/store";
import AppFormRoute from "./features/firebaseAppList/AppForm";
import { AppRoute } from "./features/firebaseAppView/AppRoute";
import { AppOverview } from "./features/firebaseAppView/AppOverview";
import { AppRoutes } from "./features/firebaseAppList/AppRoutes";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<App />}>
            <Route index element={<OverviewRoute />} />
            <Route path="apps" element={<AppListRoute />}>
              <Route index element={<AppFormRoute />} />
              <Route path=":id" element={<AppRoute />}>
                <Route path="" element={<AppOverview />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
