import axios from "axios";

export function saveOrder(body) {
  return axios
    .post("https://6330a1fff5fda801f8e3ec05.mockapi.io/api/orders", {
      order: body,
      user_id: JSON.parse(localStorage.getItem("user")).id,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return e.response;
    });
}

export function loginApi() {
  return axios
    .get("https://6330a1fff5fda801f8e3ec05.mockapi.io/api/users")
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return e.response;
    });
}

export function getOrders() {
  return axios
    .get("https://6330a1fff5fda801f8e3ec05.mockapi.io/api/orders")
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return e.response;
    });
}

export async function registerApi(body) {
  return axios
    .post("https://6330a1fff5fda801f8e3ec05.mockapi.io/api/users", {
      login: body.login,
      password: body.password,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return e.response;
    });
}
