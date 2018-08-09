import React, { Component } from "react";
import WishListView from "./components/WishListView";
import { IWishList } from "./models/WishList";

export interface Props {
  wishList: IWishList;
}

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src="https://raw.githubusercontent.com/mweststrate/mst-course/lesson5/src/assets/santa-claus.png"
            className="App-logo"
            alt="logo"
          />
          <h1 className="App-title">WishList</h1>
        </header>
        <WishListView wishList={this.props.wishList} />
      </div>
    );
  }
}

export default App;
