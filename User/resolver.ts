import { users } from "./data";

export const resolvers = {
  User: {
    products(user) {
      return user.products.map((id) => ({ __typename: "Product", id }));
    },

    __resolveReference(ref) {
      const user = users[ref.id];
      if (!user) throw new Error(`User #${ref.id} not found!`);
      return { ...user };
    },
  },

  Query: {
    async user(root, { id }, context) {
      const user = users[id];
      if (!user) throw new Error(`User #${id} not found!`);
      return { ...user };
    },

    async users(root, args, context) {
      return Object.entries(users).map((v) => ({
        ...v[1],
        id: v[0],
      }));
    },
  },
};
