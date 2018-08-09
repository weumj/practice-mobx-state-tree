import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree";
import { WishList, WishListItem } from "./WishList";
import { reaction } from "mobx";

import { IJsonPatch } from "mobx-state-tree/dist/core/json-patch";

it("can create a instance of a model", () => {
  const item = WishListItem.create({
    name: "Chronicles of Narnia Box Set - C.S. Lewis",
    price: 28.73,
  });

  expect(item.price).toBe(28.73);
  expect(item.image).toBe("");

  item.changeName("Name");
  expect(item.name).toBe("Name");
});

it("can create a wishlist", () => {
  const list = WishList.create({
    items: [
      {
        name: "Chronicles of Narnia Box Set - C.S. Lewis",
        price: 28.73,
      },
    ],
  });

  expect(list.items.length).toBe(1);
  expect(list.items[0].price).toBe(28.73);
});

it("can add new items - 2", () => {
  const list = WishList.create();
  const patches: IJsonPatch[] = [];
  onPatch(list, patch => {
    patches.push(patch);
  });

  list.add(
    WishListItem.create({
      name: "Chesterton",
      price: 10,
    }),
  );

  list.items[0].changeName("Book of G.K. Chesterton");

  expect(patches).toMatchSnapshot();
});

it("can add new items", () => {
  const list = WishList.create();
  const states: any[] = [];
  onSnapshot(list, snapshot => {
    states.push(snapshot);
  });

  list.add(
    WishListItem.create({
      name: "Chesterton",
      price: 10,
    }),
  );

  expect(list.items).toHaveLength(1);
  expect(list.items[0].name).toBe("Chesterton");

  list.items[0].changeName("Book of G.K. Chesterton");
  expect(list.items[0].name).toBe("Book of G.K. Chesterton");

  expect(getSnapshot(list)).toMatchSnapshot();
  expect(states).toMatchSnapshot();
});

it("can calculate the total price of a wishlist", () => {
  const list = WishList.create({
    items: [
      {
        name: "Machine Gun Preacher",
        price: 7.35,
        image:
          "https://images-na.ssl-images-amazon.com/images/I/91AFFK9fwkL._SY445_.jpg",
      },
      {
        name: "LEGO Mindstorms EV3",
        price: 349.95,
        image:
          "https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg",
      },
    ],
  });

  expect(list.totalPrice).toBe(357.3);

  let changed = 0;
  reaction(() => list.totalPrice, () => changed++);

  expect(changed).toBe(0);
  console.log(list.totalPrice);

  list.items[0].changeName("Test");
  expect(changed).toBe(0);

  list.items[0].changePrice(10);
  expect(changed).toBe(1);
});
