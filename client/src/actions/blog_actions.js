import axios from "axios";
import {
  CLEAN_UP,
  CREATE_BLOG,
  DELETE_BLOG,
  EDIT_BLOG,
  GET_ALL_BLOGS,
  GET_BLOG,
  MY_BLOGS,
  UPDATE_BLOG,
} from "../ACTION_TYPES";

export async function createBlog(blogData) {
  const token = localStorage.getItem("auth");

  const request = await axios
    .post(`/api/createblog`, { blogData, token })
    .then((response) => response.data);

  return {
    type: CREATE_BLOG,
    payload: request,
  };
}

export async function editBlog(blogData, id) {
  const token = localStorage.getItem("auth");

  const request = await axios
    .post(`/api/editblog`, { blogData, token, id })
    .then((response) => response.data);

  return {
    type: EDIT_BLOG,
    payload: request,
  };
}

export async function getAllBlogs(param) {
  const request = await axios
    .post(`/api/getblogs`, { param })
    .then((response) => response.data);

  return {
    type: GET_ALL_BLOGS,
    payload: request,
  };
}

export async function getMyBlogs() {
  const token = localStorage.getItem("auth");

  const request = await axios
    .post(`/api/myblogs`, { token })
    .then((response) => response.data);

  return {
    type: MY_BLOGS,
    payload: request,
  };
}

export async function getBlog(id) {
  const request = await axios
    .post(`/api/blog`, { id })
    .then((response) => response.data);

  return {
    type: GET_BLOG,
    payload: request,
  };
}

export async function deleteBlog(id) {
  const token = localStorage.getItem("auth");

  const request = await axios
    .post(`/api/blog/delete`, { token, id })
    .then((response) => response.data);

  return {
    type: DELETE_BLOG,
    payload: request,
  };
}

export function cleanUp() {
  return {
    type: CLEAN_UP,
  };
}

export async function updateReview(liked, disliked, id) {
  const token = localStorage.getItem("auth");

  const request = await axios
    .post(`/api/blog/interact`, { token, id, liked, disliked })
    .then((response) => response.data);

  return {
    type: UPDATE_BLOG,
    payload: request,
  };
}
