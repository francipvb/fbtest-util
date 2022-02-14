import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import Box from "@material-ui/core/Box/Box";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab";
import RouterTabs from "./components/routerTabs";
import RouterTab from "./components/RouterTab";
export const OverviewRoute = () => (
  <div>
    <p>Overview.</p>
  </div>
);

function App() {
  const [tab, setTab] = useState(0);
  return (
    <Box className="App">
      <Tabs
        onChange={(e, tab) => {
          setTab(tab);
        }}
        value={tab}
      >
        <Tab component={Link} label="Home" to={"/"} />
        <Tab component={Link} to="apps" label="Apps" />
      </Tabs>
      <Outlet />
    </Box>
  );
}

export default App;
