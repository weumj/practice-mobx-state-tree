import { flow, getSnapshot, onSnapshot, types } from "mobx-state-tree";

export const createStorable = (collection: string, attribute: string) =>
  types.model({}).actions((self: any) => {
    const save = flow(function* save() {
      try {
        yield window.fetch(
          `http://localhost:3001/${collection}/${self[attribute]}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getSnapshot(self)),
          },
        );
      } catch (e) {
        console.error("Uh oh, failed to save: ", e);
      }
    });

    return {
      save,
      afterCreate() {
        onSnapshot(self, save);
      },
    };
  });
