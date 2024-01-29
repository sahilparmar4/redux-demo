import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "../store/user/userData";

const store = configureStore({
    reducer: {
        userData: userDataSlice
    }
});

export default store;