import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./assets/index.css";

import { WishList } from "./models/WishList";
import { getSnapshot } from "mobx-state-tree";

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

let wishList = WishList.create(initState);

// onSnapshot(wishList, snapshot => {
//   localStorage.setItem(_STORAGE_ID_, JSON.stringify(snapshot));
// });

const renderApp = () => {
  ReactDOM.render(<App wishList={wishList} />, document.getElementById("app"));
};

renderApp();

if (module.hot) {
  module.hot.accept(["./components/App"], () => {
    renderApp();
  });

  module.hot.accept(["./models/WishList"], () => {
    const snapshot = getSnapshot(wishList);

    wishList = WishList.create(snapshot);

    renderApp();
  });
}

// setInterval(() => {
//   wishList.items[0].changePrice(wishList.items[0].price + 1);
// }, 2000);
