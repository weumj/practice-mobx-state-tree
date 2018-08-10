import React from "react";
import { observer } from "mobx-react";

import WishListItemView from "./WishListItemView";
import { IWishList } from "../models/WishList";
import WishListItemEntry from "./WishListItemEntry";

export interface Props {
  wishList: IWishList;
  readonly?: boolean;
}

const keys: number[] = Array.from(
  new Set(new Array(20).fill(1).map(() => Math.floor(Math.random() * 37))),
);

const WishListView = ({ wishList, readonly }: Props) => (
  <div className="list">
    <ul>
      {wishList.items.map((item, i) => (
        <WishListItemView key={keys[i]} item={item} />
      ))}
    </ul>
    Total: {wishList.totalPrice} €
    {!readonly && <WishListItemEntry wishList={wishList} />}
  </div>
);

export default observer(WishListView);
