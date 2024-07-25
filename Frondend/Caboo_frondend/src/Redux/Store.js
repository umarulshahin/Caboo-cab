import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
// import { persistReducer } from "redux-persist";
import userReducer from "./UserSlice"
import AdminReducer from "./AdminSlice";
import DriverReducer from "./DriverSlice";
import AuthenticationReducer from "./AuthenticationSlice";

const persistConfig ={
    key:'root',
    storage,
}

const rootReducer = combineReducers({
    Authentication:AuthenticationReducer,
    user_data:userReducer,
    admin_data:AdminReducer,
    driver_data:DriverReducer
})

const PersistedReducer = persistReducer(persistConfig,rootReducer)

// const middleware = getDefaultMiddleware({
//     serializableCheck: {
//         ignoredActions: ['persist/PERSIST'], // Ignore this action type
//     },
// });
const appStore = configureStore({

    reducer:PersistedReducer,
    // middleware,
});

const persist=persistStore(appStore)

export {persist,appStore}