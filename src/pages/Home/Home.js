import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import FoodItem from "./FoodItem";
import classes from "./Home.module.css";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const getFoods = useCallback(async () => {
    await axios
      .get("http://localhost:1234/api/actions/retrieve")
      .then((response) => {
        const loadedFoods = response.data.data.map((food) => {
          return {
            id: food._id,
            key: food._id,
            name: food.name,
            description: food.description,
            price: food.price,
          };
        });
        setFoods(loadedFoods);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, []);

  useEffect(() => {
    getFoods();
  }, [getFoods]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const foodsList = foods.map((food) => (
    <FoodItem
      id={food.id}
      key={food.id}
      name={food.name}
      description={food.description}
      price={food.price}
      getFoods={getFoods}
    />
  ));
  return foods.length > 0 ? (
    <section className={classes.meals}>
      <div className={classes.card}>
        <ul>{foodsList}</ul>
      </div>
    </section>
  ) : (
    <section className={classes.MealsLoading}>
      <p>There is no food to show</p>
    </section>
  );
};

export default Home;
