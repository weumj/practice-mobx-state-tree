import { types } from "mobx-state-tree";

export const WishListItem = types.model({
  name: types.string,
  price: types.number,
  image: "",
});

export const WishList = types.model({
  items: types.optional(types.array(WishListItem), []),
});

type WishListItemType = typeof WishListItem.Type;
type WishListType = typeof WishList.Type;

export interface IWishListItem extends WishListItemType {}

export interface IWishList extends WishListType {}
