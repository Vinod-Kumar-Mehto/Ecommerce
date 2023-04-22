import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state[index].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.push(temp);
      }
    },
    decreaseCartItem(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (state[index].qnty > 1) {
        state[index].qnty -= 1;
      }
    },
    deleteToCart(state, action) {
      state.splice(action.payload, 1);
    },
    deleteAllCart(state, action) {
      return [];
    },
  },
});

export const { addToCart, deleteToCart, deleteAllCart, decreaseCartItem } =
  userSlice.actions;
export default userSlice.reducer;
