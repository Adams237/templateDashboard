import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/user.interface";
import { getPrivateKey } from "../../feature/key";
import { decryptHybrid } from "../../feature/hybridrCypto";

interface UserState {
    value: UserInterface[]; // Replace 'any' with your actual user type if available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    token: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    permission: any
}

const initialState: UserState = {
    value: [],
    token: null,
    permission: null
};

export const loadTokenFromStorage = createAsyncThunk(
    'auth/loadToken',
    async () => {
        const encrypted = JSON.parse(localStorage.getItem('collecte') || '{}');
        const privKey = getPrivateKey();
        const jwt = await decryptHybrid(encrypted, privKey);
        return jwt;
    }
);

export const UserSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: builder => {
        builder.addCase(loadTokenFromStorage.fulfilled, (state, action) => {
            state.token = action.payload;
        });
    },
    reducers: {
        logIn: (state, action) => {
            state.value = [];
            state.value.push(action.payload.user);
            state.token=action.payload.token
            state.permission = action.payload.permission
        },
        logOut: (state) => {
            state.value = [];
        }
    }
});

export const { logIn, logOut } = UserSlice.actions

export default UserSlice.reducer