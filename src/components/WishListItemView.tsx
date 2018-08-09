import React from "react";
import { observer } from "mobx-react";
import { IWishListItem } from "../models/WishList";

export interface Props {
  item: IWishListItem;
}

export const WishListItemView = ({ item }: Props) => (
  <li className="item">
    {item.image && <img src={item.image} />}
    <h3>{item.name}</h3>
    <span>{item.price}</span>
  </li>
);

export default observer(WishListItemView);
