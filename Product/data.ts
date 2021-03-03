import {IProduct} from "./schema"

export const products: IProduct[] = [
  { id: 1, name: "Product 1", users: [{id: 1}, {id:2}, {id:3}] },
  { id: 2,  name: "Product 2", users: [{id: 4}, {id:5}, {id:6}] },
  { id: 3, name: "Product 3", users: [{id: 3}, {id:7}, {id:9}]},
];
