import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddNewMeal.module.css";

const AddNewMeal = (props) => {
  const [meal, setMeal] = useState({
    id: Date.now,
    name: "",
    description: "",
    price: 0,
  });


  const [isShow, setIsShow] = useState(false);

  const btnClasss = `${classes["action-form"]} ${
    isShow ? classes.bump : classes["bump_show"]
  }`;
  const imgToggle = isShow
    ? "https://img.icons8.com/windows/32/000000/plus.png"
    : "https://img.icons8.com/windows/32/000000/minus.png";
  const nameChangeHandler = (event) => {
    const dummy = { ...meal, name: event.target.value };
    setMeal(dummy);
  };
  const descChangeHandler = (event) => {
    const dummy = { ...meal, description: event.target.value };
    setMeal(dummy);
  };
  const priceChangeHandler = (event) => {
    const dummy = { ...meal, price: +event.target.value };
    setMeal(dummy);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    props.uploadData({ ...meal, id: Date.now() });
    setMeal({ id: Date.now, name: "", description: "", price: 0 });
  };
  const btnClick = () => {
    setIsShow(!isShow);
  };
  return (
    <React.Fragment>
      <section className={classes.space}>
        <h3 className={classes["toggle"]} onClick={btnClick}>
          ADD NEW ITEM
          <img alt="toggle button" src={imgToggle} />
        </h3>
        <section className={btnClasss}>
          <Card>
            <form onSubmit={formSubmitHandler}>
              <input
                onChange={nameChangeHandler}
                placeholder="name"
                type="text"
                value= {meal.name}
              />
              <input
                onChange={descChangeHandler}
                placeholder="description"
                type="text"
                value= {meal.description}
              />
              <input
                onChange={priceChangeHandler}
                placeholder="price"
                type="number"
                value= {meal.price}
              />
              <button type="submit"> Add new Item</button>
            </form>
          </Card>
        </section>
      </section>
    </React.Fragment>
  );
};

export default AddNewMeal;
