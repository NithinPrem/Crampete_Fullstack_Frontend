import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage/session";
import userReducer from "./features/userSlice";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	transforms: [
		encryptTransform({
			secretKey: process.env.REACT_APP_SECRET_KEY,
		}),
	],
};
const reducer = combineReducers({
	user: userReducer,
});

const persistedReducer = persistReducer(
	persistConfig,
	reducer
);
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
					REHYDRATE,
				],
			},
		}),
	devTools: false,
});
