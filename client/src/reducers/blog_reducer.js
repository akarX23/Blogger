import {
  CLEAN_UP,
  CREATE_BLOG,
  EDIT_BLOG,
  GET_ALL_BLOGS,
  MY_BLOGS,
  GET_BLOG,
  DELETE_BLOG,
  UPDATE_BLOG,
} from "../ACTION_TYPES";

const blogReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case EDIT_BLOG:
      return { ...state, edit: payload };
    case CREATE_BLOG:
      return { ...state, create: payload };
    case GET_ALL_BLOGS:
      return { ...state, blogs: payload };
    case MY_BLOGS:
      return { ...state, blogs: payload };
    case CLEAN_UP:
      return { ...state, create: null, edit: null, delete: null, update: null };
    case GET_BLOG:
      return { ...state, blog: payload };
    case DELETE_BLOG:
      return { ...state, delete: payload };
    case UPDATE_BLOG:
      return { ...state, update: payload };
    default:
      return state;
  }
};

export default blogReducer;
