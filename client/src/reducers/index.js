import { combineReducers } from "redux";
import user from "./user_reducer";
import blog from "./blog_reducer";

const rootreducers = combineReducers({
  user,
  blog,
});

export default rootreducers;
