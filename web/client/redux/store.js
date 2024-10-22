import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import mySaga from "./saga";
import familyReducer from "./slices/familySlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    families: familyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);
