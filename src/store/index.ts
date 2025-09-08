import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { userApi } from "@/services/api";

export const store = configureStore({
  reducer: {
    ...rootReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (gDM) => gDM().concat(userApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
