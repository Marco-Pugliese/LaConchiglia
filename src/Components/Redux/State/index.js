import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Lang from "../Reducers/Lang";
import Page from "../Reducers/Page";
import Cookie from "../Reducers/Cookie";

const combinedReducers = combineReducers({
  Lang,
  Page,
  Cookie,
});

const store = configureStore({
  reducer: combinedReducers,
});

export default store;
