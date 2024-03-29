import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../../firebase.config';
import { signOut } from "firebase/auth";
import { AuthService } from "../../services/auth.service";
import {UserService} from "../../services/user.service";


export const login = createAsyncThunk(
    'auth/login',
    async data => {
        await AuthService.login(data.email, data.password);
    }
);

export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async () => {
        await AuthService.loginWithGoogle();
    }
)
export const register = createAsyncThunk(
    'auth/register',
    async data => {
        return await AuthService.register(
            data.email, data.password, data.username
        );
    }
);

export const deleteUser = createAsyncThunk(
    'auth/delete',
    async password => {
        const response =  await AuthService.deleteUser(password);
        signOut(auth).then(() => {
            localStorage.removeItem("userData");
            window.location.pathname = '/login';
        })
        return response;
    }
);

export const updateUserProfile = createAsyncThunk(
    'user/update',
    async ({username, avatar}, {getState}) => {
        const user = getState().authStates.userData;
        return await UserService.updateUser(user, username, avatar);
    }
);

const authSlice = createSlice({
    name: 'authStates',
    initialState: {
        userData: localStorage.getItem('userData') || null,
        authError: null,
        status: undefined
    },
    
    reducers: {
        setUser(state, action) {
            state.userData = action.payload.data;
            localStorage.setItem(
                "userData",
                JSON.stringify(state.userData)
            );
        },

        logoutHandler(state) {
            signOut(auth)
                .then(() => {
                    state.userData = null;
                    localStorage.removeItem("userData");
                    window.location.pathname = '/login';
            })
                .catch(error => state.authError = error);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, state => {
                state.status = 'loading';
            })

            .addCase(login.fulfilled, (state, action) => {
                state.status = 'success';
                state.userData = action.payload;
                window.location.pathname = '/';
            })

            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.authError = action.error;
            })

            .addCase(register.pending, state => {
                state.status = 'loading';
            })

            .addCase(register.fulfilled, (state, action) => {
                state.status = 'success';
                if (action.payload && action.payload.userData)
                    state.userData = action.payload.userData;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.authError = action.error;
            })

            .addCase(loginWithGoogle.pending, state => {
                state.status = 'loading';
            })

            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.status = 'success';
            })

            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.authError = action.error;
                state.status = 'failed';
            })

            .addCase(deleteUser.pending, state => {
                state.status = 'loading';
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                console.log(action)
                if (action.payload && action.payload.userData) {
                    state.userData = action.payload.userData;
                    state.status = 'success';

                }
            })

            .addCase(deleteUser.rejected, (state, action) => {
                console.log(action)
                state.authError = action.error
                state.status = 'failed'
            })

            .addCase(updateUserProfile.fulfilled, (state, action) => {
                console.log(action)
                localStorage.setItem('userData', JSON.stringify(action.payload))
                state.userData = action.payload;
                window.location.reload();
            })

            .addCase(updateUserProfile.rejected, (state, action) => {
                console.log(action)
            })
    }
})

export const { setUser, logoutHandler } = authSlice.actions;
export default authSlice.reducer;