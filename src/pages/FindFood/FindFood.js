import { useRef, Fragment, useState } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import classes from "./FindFood.module.css";
import swal from "sweetalert2";

import axios from "axios";
import FoodItem from "../Home/FoodItem";

const FindFood = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [foodsFound, setFoodsFound] = useState([]);
  const nameInputRef = useRef();
  const idInputRef = useRef();

  const submitFormHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredName = nameInputRef.current.value;
    const enteredId = idInputRef.current.value;

    if (enteredId.trim() !== "" || enteredName.trim() !== "") {
      let document = { retrieve: false };
      if (enteredId.trim() !== "") {
        nameInputRef.current.value = "";
        document = { id: enteredId };
      } else {
        document = { name: enteredName };
      }
      await axios
        .get("http://localhost:1234/api/actions/retrieve", { params: document })
        .then((response) => {
          setIsLoading(false);
          if (response.data.data.length === 0) {
            swal.fire({
              icon: "error",
              title: "No associated records!",
              confirmButtonColor: "#8a2b06",
            });
          } else {
            setFoodsFound(response.data.data);
          }
        })
        .catch(() => {
          setIsLoading(false);
          swal.fire({
            icon: "error",
            title: "An error has ocurred!",
            confirmButtonColor: "#8a2b06",
          });
        });
    } else {
      setIsLoading(false);
      swal.fire({
        icon: "error",
        title: "All fields must be filled in!",
        confirmButtonColor: "#8a2b06",
      });
    }
  };

  return (
    <Fragment>
      <div className={classes.card}>
        <form className={classes.form} onSubmit={submitFormHandler}>
          {isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="id">Type the id</label>
            <input type="text" id="id" ref={idInputRef} />
          </div>
          <span>or</span>
          <div className={classes.control}>
            <label htmlFor="name">Type the name</label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
          <div className={classes.actions}>
            <button className="btn">Find Food</button>
          </div>
        </form>
      </div>
      {foodsFound.length > 0 && (
        <section className={classes.meals}>
          <div className={classes.card}>
            <ul>
              {foodsFound.map((food) => (
                <FoodItem
                  id={food._id}
                  key={food._id}
                  name={food.name}
                  description={food.description}
                  price={food.price}
                  getFoods={null}
                />
              ))}
            </ul>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default FindFood;
