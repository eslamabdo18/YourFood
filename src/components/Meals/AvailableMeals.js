import React, { useState, useEffect} from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/send-http";
import AddNewMeal from "./AddNewMeal";
import loading from "../../assets/ATB3o.gif";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: uploadData } = useHttp();

  const insertNewItem = (meal) => {
    uploadData(
      {
        url: "https://try1-238c7-default-rtdb.firebaseio.com/meals.json",
        method: "POST",
        body: meal,
      },
      () => {
        const dummy = [...meals];
        dummy.push(meal);
        setMeals(dummy);
      }
    );
  };

  useEffect(() => {
    uploadData(
      { url: "https://try1-238c7-default-rtdb.firebaseio.com/meals.json" },
      (data) => {
        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push({
            id: data[key].id,
            name: data[key].name,
            price: data[key].price,
            description: data[key].description,
          });
        }
        setMeals(loadedMeals);
      }
    );
  }, [uploadData]);
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      price={meal.price}
      desc={meal.description}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading ? (
          <ul>{mealsList}</ul>
        ) : (
          <img alt="loading" src={loading} />
        )}
        {error && <p>{error}</p>}
      </Card>
      <AddNewMeal uploadData={insertNewItem} />
    </section>
  );
};

export default AvailableMeals;
