import { configureStore } from "@reduxjs/toolkit";

import tabsReducer from "../features/tabs/tabsSlice";
import userReducer from "../features/users/usersSlice";
import postsReducer from "../features/posts/postsSlice";
import loginReducer from "../features/login/loginSlice";

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    users: userReducer,
    posts: postsReducer,
    login: loginReducer,
  },
});
