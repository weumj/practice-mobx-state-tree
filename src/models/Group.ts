import { flow, types } from "mobx-state-tree";
import { WishList } from "./WishList";

const User = types
  .model({
    id: types.string,
    name: types.string,
    gender: types.enumeration("gender", ["m", "f"]),
    wishList: types.optional(WishList, {}),
  })
  .actions(self => ({
    getSuggestions: flow(function* getSuggestions() {
      const items = yield (yield window.fetch(
        `http://localhost:3001/suggestions_${self.gender}`,
      )).json();

      self.wishList.items.push(...items);
    }),
  }));

type UserType = typeof User.Type;
export interface IUser extends UserType {}

export const Group = types.model({
  users: types.map(User),
});

type GroupType = typeof Group.Type;
export interface IGroup extends GroupType {}
