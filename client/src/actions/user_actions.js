import axios from "axios";
import { USER_AUTH, LOGOUT, SIGNUP, LOGIN } from "../ACTION_TYPES";

export async function auth() {
  const token = localStorage.getItem("auth");
  const request = await axios
    .post("/api/auth", { token })
    .then((response) => response.data);

  return {
    type: USER_AUTH,
    payload: request,
  };
}

export async function logout() {
  localStorage.removeItem("auth");
  const request = await axios.get("/api/logout").then((response) => {
    return response.data;
  });

  return {
    type: LOGOUT,
    payload: request,
  };
}

export async function signUp(userdata) {
  const request = await axios
    .post("/api/user/register", userdata)
    .then((response) => {
      return response.data;
    });

  localStorage.setItem("auth", request.user?.token);

  return {
    type: SIGNUP,
    payload: request,
  };
}

export async function login(userdata) {
  const request = await axios
    .post("/api/user/login", userdata)
    .then((response) => {
      return response.data;
    });

  localStorage.setItem("auth", request.user?.token);

  return {
    type: LOGIN,
    payload: request,
  };
}
