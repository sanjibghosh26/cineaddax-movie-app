
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export function UseAuth() {
  return useContext(AuthContext);
}
