import { SET_COOKIE } from "../Actions";

const initialState = {
  isAccepted: "waitingToBeAccepted",
};

const Lang = (state = initialState, action) => {
  switch (action.type) {
    case SET_COOKIE:
      return {
        isAccepted: action.payload,
      };

    default:
      return state;
  }
};
export default Lang;
