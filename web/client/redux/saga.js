import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchFamilyFailed,
  fetchFamilyRequest,
  fetchFamilySuccess,
} from "./slices/familySlice";
import { getDetailFamily } from "@/apis";

function* fetchFamily(action) {
  try {
    const family = yield call(getDetailFamily, action.payload);
    yield put(fetchFamilySuccess(family));
  } catch (e) {
    yield put(fetchFamilyFailed(e));
  }
}

function* mySaga() {
  yield takeEvery(fetchFamilyRequest.type, fetchFamily);
}

export default mySaga;
