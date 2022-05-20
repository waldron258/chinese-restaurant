import { useRef, Fragment, useState, useEffect } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import classes from "./FoodForm.module.css";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FoodForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceInputRef = useRef();
  const navigate = useNavigate();

  const reset = () => {
    nameInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    priceInputRef.current.value = "";
  };

  useEffect(() => {
    if (props.isEdit) {
      nameInputRef.current.value = props.food.name;
      descriptionInputRef.current.value = props.food.description;
      priceInputRef.current.value = props.food.price;
    } else {
      nameInputRef.current.value = "";
      descriptionInputRef.current.value = "";
      priceInputRef.current.value = "";
    }
  }, [props.isEdit, props.food.name, props.food.description, props.food.price]);

  const handleCreate = async (
    enteredName,
    enteredDescription,
    enteredPrice
  ) => {
    await axios
      .post("http://localhost:1234/api/actions/create", {
        document: {
          name: enteredName,
          description: enteredDescription,
          price: Number(enteredPrice),
        },
      })
      .then(() => {
        setIsLoading(false);
        swal
          .fire({
            icon: "success",
            title: "Succesfully created!",
            confirmButtonColor: "#8a2b06",
          })
          .then(() => reset());
      })
      .catch(() => {
        setIsLoading(false);
        swal.fire({
          icon: "error",
          title: "An error has ocurred!",
          confirmButtonColor: "#8a2b06",
        });
      });
  };

  const handleUpdate = async (
    enteredName,
    enteredDescription,
    enteredPrice
  ) => {
    await axios
      .put("http://localhost:1234/api/actions/update", {
        document: { id: props.food._id },
        newDocument: {
          name: enteredName,
          description: enteredDescription,
          price: Number(enteredPrice),
        },
      })
      .then(() => {
        setIsLoading(false);
        swal
          .fire({
            icon: "success",
            title: "Succesfully updated!",
            confirmButtonColor: "#8a2b06",
          })
          .then(() => navigate("/", { replace: true }));
      })
      .catch(() => {
        setIsLoading(false);
        swal.fire({
          icon: "error",
          title: "An error has ocurred!",
          confirmButtonColor: "#8a2b06",
        });
      });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredName = nameInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;

    if (
      enteredName.trim() !== "" &&
      enteredDescription.trim() !== "" &&
      enteredPrice.trim() !== ""
    ) {
      if (props.isEdit) {
        handleUpdate(enteredName, enteredDescription, enteredPrice);
      } else {
        handleCreate(enteredName, enteredDescription, enteredPrice);
      }
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
            <label htmlFor="name">Food's Name</label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="3"
              ref={descriptionInputRef}
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor="price">Price</label>
            <input type="number" id="price" ref={priceInputRef} />
          </div>
          <div className={classes.actions}>
            <button className="btn">
              {props.isEdit ? "Update Food" : "Add Food"}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default FoodForm;
