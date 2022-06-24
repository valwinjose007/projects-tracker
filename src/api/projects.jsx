import apiClient from "./client";

const endPoint = "/";

const getProjets = () => apiClient.get(endPoint);

export default {
  getProjets,
};
