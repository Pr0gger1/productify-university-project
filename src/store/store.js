import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from './reducers/SidebarSlice';
import themeReducer from './reducers/ThemeSlice';
import mobileReducer from './reducers/MobileSlice';
import authReducer from './reducers/AuthSlice';
import routeReducer from './reducers/RouteSlice';
import taskLogicReducer from './reducers/TaskLogicSlice';
import filterReducer from './reducers/FilterSlice';
import taskGroupReducer from './reducers/TaskGroupSlice';
import taskReducer from './reducers/TaskSlice';

export default configureStore({
    reducer: {
        mobileStates: mobileReducer,
        themeState: themeReducer,
        sidebarStates: sidebarReducer,

        authStates: authReducer,
        routeState: routeReducer,

        taskGroupStates: taskGroupReducer,
        taskLogic: taskLogicReducer,

        filterStates: filterReducer,
        tasksStates: taskReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
})