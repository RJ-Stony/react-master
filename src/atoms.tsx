import { atom, selector, RecoilEnv } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const toDoState = atom({
  key: "toDo",
  default: ["A", "B", "C", "D", "E", "F"],
});
