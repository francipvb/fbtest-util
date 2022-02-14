import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import { AppDispatch, AppState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppStore = () => useStore<AppState>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
