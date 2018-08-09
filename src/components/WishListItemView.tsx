import React, { Component } from "react";
import { observer } from "mobx-react";
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree";

import { IWishListItem } from "../models/WishList";

import WishListItemEdit from "./WishListItemEdit";

export interface Props {
  item: IWishListItem;
}

interface State {
  isEditing: boolean;
  clone?: any;
}

export class WishListItemView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isEditing: false };
  }

  render() {
    return this.state.isEditing ? this.renderEditItem() : this.renderItem();
  }

  private renderItem() {
    const { item } = this.props;
    return (
      <li className="item">
        {item.image && <img src={item.image} />}
        <h3>{item.name}</h3>
        <span>{item.price}</span>
        <span>
          <button onClick={this.onToggleEdit}>✏</button>
        </span>
      </li>
    );
  }

  private renderEditItem() {
    return (
      <li className="item">
        <WishListItemEdit item={this.state.clone} />
        <button onClick={this.onSaveEdit}>💾</button>
        <button onClick={this.onCancelEdit}>❎</button>
      </li>
    );
  }

  onToggleEdit = () => {
    this.setState({
      isEditing: true,
      clone: clone(this.props.item),
    });
  };

  onCancelEdit = () => {
    this.setState({ isEditing: false });
  };

  onSaveEdit = () => {
    applySnapshot(this.props.item, getSnapshot(this.state.clone));
    this.setState({ isEditing: false, clone: null });
  };
}

export default observer(WishListItemView);
