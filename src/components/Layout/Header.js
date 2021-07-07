import React from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpeg";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
          <h1>YourMeals</h1>
          <HeaderCartButton/>
      </header>
      <div className={classes['main-image']}>
        <img  alt="header" src={mealsImage}/>
      </div>
    </React.Fragment>
  );
};

export default Header;
