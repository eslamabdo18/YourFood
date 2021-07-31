import React, { useState, useEffect, useCallback } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import AddNewMeal from "./AddNewMeal";
import loading from "../../assets/ATB3o.gif";

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);
  const uploadData = useCallback(async (meal) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://try1-238c7-default-rtdb.firebaseio.com/meals.json",
        {
          method: "POST",
          body: JSON.stringify(meal),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    const dummy  = [...meals];
    dummy.push(meal);
    setMeals(dummy);
    console.log(dummy);
    setIsLoading(false);
  }, [meals]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const loadedMeals = [];
    try {
      const res = await fetch(
        "https://try1-238c7-default-rtdb.firebaseio.com/meals.json"
      );
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await res.json();

      for (const key in data) {
        loadedMeals.push({
          id: data[key].id,
          name: data[key].name,
          price: data[key].price,
          description: data[key].description,
        });
      }
      setMeals(loadedMeals);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData,setMeals]);
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
        {!isLoading ? <ul>{mealsList}</ul> : <img alt="loading" src={loading}/>}
        {error && <p>{error}</p>}
      </Card>
      <AddNewMeal uploadData={uploadData} />
    </section>
  );
};

export default AvailableMeals;
