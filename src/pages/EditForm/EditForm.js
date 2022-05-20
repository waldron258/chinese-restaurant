import FoodForm from "../../components/Form/FoodForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "../Home/Home.module.css";
import axios from "axios";

const EditForm = () => {
  const params = useParams();
  const { foodId } = params;

  const [food, setFood] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFood = async (id) => {
      const document = { id: id };
      await axios
        .get("http://localhost:1234/api/actions/retrieve", { params: document })
        .then((response) => {
          setIsLoading(false);
          setFood(response.data.data[0]);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    };
    getFood(foodId);
  }, [foodId]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  return food && <FoodForm isEdit={true} food={food} />;
};

export default EditForm;
