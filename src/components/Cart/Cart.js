import { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

const Cart = (props) => {

  const cartCtx = useContext(CartContext);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
  const total = "$" + cartCtx.totalAmount.toFixed(2);
  return (
    <Modal onClick={props.btnClickedHnadler}>
      {cartItems}
      <div className={classes.total}>
          <span>Total Amount:</span>
          <span>{total}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={()=> props.btnClickedHnadler()}>close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};
export default Cart;
