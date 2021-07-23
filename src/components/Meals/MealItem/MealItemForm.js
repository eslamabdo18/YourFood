import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [showErrorMessage, setShowErrorMessage] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enterdAmount = amountInputRef.current.value;
    const enterdAmountNum = +enterdAmount;

    if (
      enterdAmount.trim().length === 0 ||
      enterdAmountNum < 1 ||
      enterdAmountNum > 5
    ) {
      setShowErrorMessage(false);
      return;
    }
    props.onAddToCart(enterdAmountNum)
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
      {!showErrorMessage && <p>Invalid Input</p>}
    </form>
  );
};
export default MealItemForm;
