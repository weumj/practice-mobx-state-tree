import React from "react";
import ReactDOM from "react-dom";
import { getSnapshot, addMiddleware } from "mobx-state-tree";

import App from "./App";

import "./assets/index.css";

import { Group } from "./models/Group";

const _STORAGE_ID_ = "wishlistapp";

let initState = {
  users: {},
};

if (localStorage.getItem(_STORAGE_ID_)) {
  const json = JSON.parse(localStorage.getItem(_STORAGE_ID_) as string);

  if (Group.is(json)) {
    // initState = json;
  }
}

let group = ((window as any).group = Group.create(initState as any));

addMiddleware(group, (call, next) => {
  console.log(`[${call.type}] ${call.name}`);
  next(call);
});

// onSnapshot(wishList, snapshot => {
//   localStorage.setItem(_STORAGE_ID_, JSON.stringify(snapshot));
// });

const renderApp = () => {
  ReactDOM.render(<App group={group} />, document.getElementById("app"));
};

renderApp();

if (module.hot) {
  module.hot.accept(["./App"], () => {
    renderApp();
  });

  module.hot.accept(["./models/Group"], () => {
    const snapshot = getSnapshot(group);

    group = (window as any).group = Group.create(snapshot);

    renderApp();
  });
}

// setInterval(() => {
//   wishList.items[0].changePrice(wishList.items[0].price + 1);
// }, 2000);
