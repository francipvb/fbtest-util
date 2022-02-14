import Tab, { TabProps } from "@material-ui/core/Tab";
import { useContext, useEffect } from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import { tabsContext } from "./routerTabs";
type Props = Omit<LinkProps, "children"> &
  Omit<TabProps<typeof Link>, "value" | "component" | "href">;

export default function RouterTab(props: Props) {
  const context = useContext(tabsContext);
  const resolved = useResolvedPath(props.to);
  const matches = useMatch({ path: resolved.pathname, end: true });
  useEffect(() => {
    if (matches && context.current != resolved.pathname) {
      context.setCurrent(resolved.pathname);
    }
  }, [matches, context]);
  return <Tab {...props} component={Link} value={resolved?.pathname} />;
}
