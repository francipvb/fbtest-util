import { useCallback } from "react";
import { useAppSelector } from "../../app/hooks";
import { appByIDSelector, appCrud, appListSelector } from "./firebaseAppSlize";
import { App, AppID } from "./model";

export function useApp(id: AppID) {
  const selector = useCallback(appByIDSelector(id), [id]);
  return useAppSelector(selector);
}
export function useAppList() {
  return useAppSelector(appListSelector);
}
