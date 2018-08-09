import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./assets/index.css";

import { WishList } from "./models/WishList";
import { onSnapshot } from "mobx-state-tree";

const _STORAGE_ID_ = "wishlistapp";

let initState;

if (localStorage.getItem(_STORAGE_ID_)) {
  const json = JSON.parse(localStorage.getItem(_STORAGE_ID_) as string);

  if (WishList.is(json)) {
    initState = json;
  }
} else {
  initState = {
    items: [
      {
        name: "LEGO Mindstorms EV3",
        price: 349.95,
        image:
          "https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg",
      },
      {
        name: "Miracles - C.S. Lewis",
        price: 12.91,
        image:
          "https://images-na.ssl-images-amazon.com/images/I/51a7xaMpneL._SX329_BO1,204,203,200_.jpg",
      },
    ],
  };
}

const wishList = WishList.create(initState);

onSnapshot(wishList, snapshot => {
  localStorage.setItem(_STORAGE_ID_, JSON.stringify(snapshot));
});

ReactDOM.render(<App wishList={wishList} />, document.getElementById("app"));

// setInterval(() => {
//   wishList.items[0].changePrice(wishList.items[0].price + 1);
// }, 2000);
