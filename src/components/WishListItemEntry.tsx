import React, { ChangeEvent, Component } from "react";
import { observer } from "mobx-react";
import { IWishList, IWishListItem, WishListItem } from "../models/WishList";
import WishListItemEdit from "./WishListItemEdit";

export interface Props {
  wishList: IWishList;
}
interface State {
  entry: IWishListItem;
}

export class WishListItemEntry extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      entry: WishListItem.create({ name: "", price: 0 }),
    };
  }

  onAdd = () => {
    this.props.wishList.add(this.state.entry);
    this.setState({
      entry: WishListItem.create({ name: "", price: 0 }),
    });
  };

  render() {
    return (
      <div>
        <WishListItemEdit item={this.state.entry} />
        <button onClick={this.onAdd}>Add</button>
      </div>
    );
  }
}

export default observer(WishListItemEntry);
