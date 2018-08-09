import React, { ChangeEvent, Component } from "react";
import { observer } from "mobx-react";
import { IWishListItem } from "../models/WishList";

export interface Props {
  item: IWishListItem;
}

export class WishListItemEdit extends Component<Props> {
  onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.item.changeName(e.target.value);
  };

  onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const price = Number.parseFloat(e.target.value);
    if (!Number.isNaN(price)) {
      this.props.item.changePrice(price);
    }
  };

  onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.item.changeImage(e.target.value);
  };

  render() {
    const { item } = this.props;

    return (
      <div className="item-edit">
        Thing: <input value={item.name} onChange={this.onNameChange} />
        <br />
        Price: <input value={item.price} onChange={this.onPriceChange} />
        <br />
        Image: <input value={item.image} onChange={this.onImageChange} />
        <br />
      </div>
    );
  }
}

export default observer(WishListItemEdit);
