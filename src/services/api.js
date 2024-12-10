import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchMenus = async () => {
  console.log(process.env.REACT_APP_API_URL);
  
  const response = await axios.get(API_URL);
  return response.data;
};

export const createMenu = async (menu) => {
  const response = await axios.post(API_URL, menu);
  return response.data;
};

export const fetchMenuItems = async (menuId) => {
  const response = await axios.get(`${API_URL}/${menuId}`);
  return response.data;
};

export const addItemToMenu = async (menuId, item) => {
  const response = await axios.post(`${API_URL}/${menuId}/items`, item);
  return response.data;
};