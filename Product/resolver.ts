import { products } from "./data";

export const resolvers = {
  Product: {
    /* this is the field that from external implementing services */
    users(product) {
      return product.users.map((id) => ({ __typename: "User", id }));
    },

    __resolveReference(ref) {
      const product = products[ref.id];
      if (!product) throw new Error(`Product ${ref.id} not exist`);
      console.log(product);
      // return { product };
      return { ...product };
    },
  },
  Query: {
    async product(root, { id }, context) {
      const product = products[id];
      if (!product) throw new Error(`Product ${id} not exist`);
      return { ...product };
    },

    async products(root, args, context) {
      return products
    },
  },
};
