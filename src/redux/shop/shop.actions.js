import { shopActionTypes } from "./shop.types";

export const setShopData = data => ({
  type: shopActionTypes.SET_SHOP_DATA,
  payload: data
});

