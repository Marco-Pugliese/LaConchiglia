import { SET_PAGE } from "../Actions";

const initialState = {
  page: "Home",
};

const Page = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        page: action.payload,
      };

    default:
      return state;
  }
};
export default Page;
