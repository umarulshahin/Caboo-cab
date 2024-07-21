import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
// import { persistReducer } from "redux-persist";
import signupReducer from "./SignupSlice"
import userReducer from "./UserSlice"
import AdminReducer from "./AdminSlice";

const persistConfig ={
    key:'root',
    storage,
}

const rootReducer = combineReducers({
    signup_data:signupReducer,
    user_data:userReducer,
    admin_data:AdminReducer
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