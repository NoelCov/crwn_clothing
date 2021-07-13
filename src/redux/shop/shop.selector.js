import { createSelector } from "reselect";

import memoize from "lodash.memoize";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForOverview = createSelector(
  [selectCollections],
  (selection) =>
    selection ? Object.keys(selection).map((key) => selection[key]) : []
);

export const selectCollection = memoize((collectionParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionParam] : null
  )
);
