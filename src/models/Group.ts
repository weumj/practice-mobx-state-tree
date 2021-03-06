import { applySnapshot, flow, getParent, IType, types } from "mobx-state-tree";
import { IWishList, WishList } from "./WishList";
import { createStorable } from "./Storable";

interface UserModel {
  id: string;
  name: string;
  gender: "m" | "f";
  wishList: IWishList;
  recipient?: UserModel;
  other: UserModel;
  getSuggestions: () => void;
  save: () => Promise<any>;
}

const User: IType<any, any, UserModel> = types.compose(
  types
    .model({
      id: types.identifier,
      name: types.string,
      gender: types.enumeration("gender", ["m", "f"]),
      wishList: types.optional(WishList, {}),
      recipient: types.maybe(types.reference(types.late(() => User))),
    })
    .views(self => ({
      get other() {
        return getParent(self).get(self.recipient);
      },
    }))
    .actions(self => {
      const getSuggestions = flow(function* getSuggestions() {
        const items = yield (yield window.fetch(
          `http://localhost:3001/suggestions_${self.gender}`,
        )).json();

        self.wishList.items.push(...items);
      });

      return {
        getSuggestions,
      };
    }),
  createStorable("users", "id"),
);

type UserType = typeof User.Type;
export interface IUser extends UserType {}

export const Group = types
  .model({
    users: types.map(User),
  })
  .actions(self => {
    let controller: AbortController;

    const load = flow(function* load() {
      controller = new AbortController();
      try {
        const users: UserModel[] = yield (yield window.fetch(
          `http://localhost:3001/users`,
          {
            signal: controller && controller.signal,
          },
        )).json();
        applySnapshot(
          self.users,
          users.reduce((base, user) => ({ ...base, [user.id]: user }), {}),
        );
        console.log("success");
      } catch (e) {
        console.log("aborted", e.name);
      }
    });

    const drawLots = () => {
      const allUsers: IUser[] = [...self.users.values()];

      if (allUsers.length <= 1) {
        return;
      }

      let remaining = allUsers.slice();

      allUsers.forEach(user => {
        if (remaining.length === 1 && remaining[0] === user) {
          const swapWith =
            allUsers[Math.floor(Math.random() * (allUsers.length - 1))];

          user.recipient = swapWith.recipient;
          swapWith.recipient = self as any;
        } else {
          while (!user.recipient) {
            let recipientIdx = Math.floor(Math.random() * remaining.length);

            if (remaining[recipientIdx] !== user) {
              user.recipient = remaining[recipientIdx];
              remaining.splice(recipientIdx, 1);
            }
          }
        }
      });
    };

    return {
      afterCreate() {
        load();
      },
      reload() {
        if (controller) controller.abort();
        load();
      },
      beforeDestroy() {
        if (controller) controller.abort();
      },
      load,
      drawLots,
    };
  });
type GroupType = typeof Group.Type;
export interface IGroup extends GroupType {}
