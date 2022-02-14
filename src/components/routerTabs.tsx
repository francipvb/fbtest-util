import Tabs from "@material-ui/core/Tabs/Tabs";
import {
  ChangeEvent,
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";
import { Path, To } from "react-router-dom";

export const tabsContext = createContext<TabsContext>({
  setCurrent: (_) => {
    throw Error("Not implemented.");
  },
});

export interface TabsContext {
  setCurrent: (to: string) => void;
  current?: string;
}

export default function RouterTabs(props: PropsWithChildren<{}>) {
  const [currentTab, setCurrentTab] = useState<string>("");
  const context: TabsContext = useMemo(
    () => ({
      current: currentTab,
      setCurrent: setCurrentTab,
    }),
    [currentTab]
  );
  return (
    <tabsContext.Provider value={context}>
      <Tabs value={currentTab}>{props.children}</Tabs>
    </tabsContext.Provider>
  );
}
