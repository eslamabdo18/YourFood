import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    let updatedItems = state.items.concat(action.item);

    const isItemExsit = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const exsitItem = state.items[isItemExsit];
    let updatedItem;

    if (exsitItem) {
      updatedItem = {
        ...exsitItem,
        amount: exsitItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[isItemExsit] = updatedItem;
    }

    const totalUpdatedAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: totalUpdatedAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {

    const removedItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    let removedItem = state.items[removedItemIndex];
    const totalUpdatedAmount =
    state.totalAmount - removedItem.price;

    let updatedItems
    let updatedItem
    if (removedItem.amount >1) {
      updatedItem = {
        ...removedItem,
        amount: +removedItem.amount - 1,
      };
      updatedItems = [...state.items]
      updatedItems[removedItemIndex] = updatedItem;
    }else{
      updatedItems = state.items.filter(item => item.id !== action.id)
    }
      return {
        items: updatedItems,
        totalAmount: totalUpdatedAmount,
      };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
