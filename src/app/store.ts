import { configureStore } from "@reduxjs/toolkit";
import firebaseAppSlize from "../features/firebaseAppList/firebaseAppSlize";

const appStore = configureStore({
  reducer: {
    apps: firebaseAppSlize,
  },
});

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export default appStore;
