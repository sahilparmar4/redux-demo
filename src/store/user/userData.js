import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/apiHandler";

export const getUserData = createAsyncThunk("users",  async (data, { dispatch })  => {
    try{
        dispatch(setLoader(true));
        const response = await API?.getUser({});
        console.log(response);
        dispatch(setLoader(false));
        return response;
    }catch(e){
        console.log(e);
    }
});

const initialState = {
    getUsers:{
        data: [],
        error: null
    }
}

const userDataSlice = createSlice({
    name:"UserData",
    initialState,
    reducers:{
        setLoader: (state, action)=>{
            console.log(state);
            state.isLoading = action?.payload?.data;
        }
    },
    extraReducers:(builder)=>{
        builder?.addCase(getUserData?.fulfilled, (state, action)=>{
            state.getUsers.data = action.payload;
        }).addCase(getUserData?.rejected, (state, action)=>{
            state.getUsers.error = action.error.message;
        })
    }
});

export const { setLoader } = userDataSlice.actions;
export default userDataSlice.reducer;