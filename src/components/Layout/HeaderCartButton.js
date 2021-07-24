import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {

  const [btnIsClicked, setBtnClicked] = useState(false);
  const cartCtx = useContext(CartContext);
  const {items} = cartCtx;
  const numberOfItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  
  const btnClasss = `${classes.button} ${btnIsClicked ? classes.bump : ''}`;
  useEffect(() => {
    if(items.length === 0){
      return;
    }
    setBtnClicked(true);

    const timer =setTimeout(() => {
      setBtnClicked(false)
    },300)
    return ()=>{
      clearTimeout(timer);
    };
  }, [items]);
  
  return (
    <button className={btnClasss} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
