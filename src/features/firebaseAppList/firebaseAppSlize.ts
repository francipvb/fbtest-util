import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import { AppState } from "../../app/store";
import { App, AppID } from "./model";
import { createApp, loadList, removeApp, updateApp } from "./storage";

export const appCrud = createEntityAdapter<App>({
  selectId: (m) => m.id!,
});

export const add = createAsyncThunk("apps/createApp", createApp);
export const load = createAsyncThunk("apps/load", loadList);
export const remove = createAsyncThunk("apps/remove", removeApp);
export const update = createAsyncThunk("apps/update", updateApp);
type ErrorAction =
  | typeof add.rejected
  | typeof remove.rejected
  | typeof load.rejected
  | typeof update.rejected;
type FulfilledActions =
  | typeof add.fulfilled
  | typeof remove.fulfilled
  | typeof load.fulfilled
  | typeof update.fulfilled;
type NotLoadingAction = FulfilledActions | ErrorAction;
type LoadingActions =
  | typeof add.pending
  | typeof remove.pending
  | typeof load.pending
  | typeof update.pending;

const slize = createSlice({
  name: "apps",
  initialState: appCrud.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(add.fulfilled, (state, action) =>
        appCrud.addOne(state, action.payload)
      )
      .addCase(load.fulfilled, (state, action) => {
        appCrud.setAll(state, action.payload);
      })
      .addCase(remove.fulfilled, (state, action) => {
        appCrud.removeOne(state, action.meta.arg);
      })
      .addCase(update.fulfilled, (state, action) => {
        appCrud.updateOne(state, {
          id: action.meta.arg.id,
          changes: action.payload,
        });
      });
  },
});

export const {} = slize.actions;

const selectors = appCrud.getSelectors();
export const appListSelector = (state: AppState) =>
  selectors.selectAll(state.apps);
export const appByIDSelector = (id: AppID) => (state: AppState) =>
  selectors.selectById(state.apps, id);

export default slize.reducer;
