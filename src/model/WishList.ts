import { types } from "mobx-state-tree";

export const WishListItem = types
  .model({
    name: types.string,
    price: types.number,
    image: "",
  })
  .actions(self => ({
    changeName(newName: string) {
      self.name = newName;
    },
    changePrice(newPrice: number) {
      self.price = newPrice;
    },
    changeImage(newImage: string) {
      self.image = newImage;
    },
  }));

type WishListItemType = typeof WishListItem.Type;
export interface IWishListItem extends WishListItemType {}

export const WishList = types
  .model({
    items: types.optional(types.array(WishListItem), []),
  })
  .actions(self => ({
    add(item: IWishListItem) {
      self.items.push(item);
    },
  }))
  .views(self => ({
    get totalPrice() {
      return self.items.reduce((sum, item) => sum + item.price, 0);
    },
  }));

type WishListType = typeof WishList.Type;

export interface IWishList extends WishListType {}
