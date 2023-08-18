import { createStore } from "redux";

const initialState = {
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        users: [...state.user, action.payload],
      };
    default:
      return state;
  }
};

export default createStore(reducer)
