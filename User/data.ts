import {IProduct, IUser} from "./schema"
export const users: IUser[] = [
  { id: 1, name: "User 1", products: [ {id:1}, {id:2}] },
  { id: 2, name: "User 2", products: [{id:1}, {id:2}] },
  { id: 3, name: "User 3", products: [{id:1}] },
  { id: 4, name: "User 4", products: [{id:2}] },
  { id: 5, name: "User 5", products: [{id:1}, {id:2}, {id:3}] },
  { id: 6, name: "User 6", products: [{id:2}, {id:3}] },
  { id: 7, name: "User 7", products: [{id:2}, {id:3}] },
  { id: 8, name: "User 8", products: [{id:1}, {id:3}] },
  { id: 9, name: "User 9", products: [{id:3}] },
  { id: 10, name: "User 10", products: [{id:1}, {id:2}, {id:3}] },
  {id: 11,  name: "User 11", products: [{id:1}, {id:2}, {id:3}] },
];
