import classes from "./FoodItem.module.css";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";
import { useState } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const FoodItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    swal
      .fire({
        title: "Are you sure you want to delete food?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        confirmButtonColor: "#8a2b06",
        denyButtonColor: "#8a2b06",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          const document = { id: props.id };
          await axios
            .delete("http://localhost:1234/api/actions/remove", {
              data: { document: document },
            })
            .then(() => {
              setIsLoading(false);
              swal
                .fire({ title: "Food deleted!", confirmButtonColor: "#8a2b06" })
                .then(() => {
                  navigate("/", { replace: false });
                  if (props.getFoods !== null) {
                    setIsLoading(true);
                    props.getFoods();
                    setIsLoading(false);
                  }
                });
            })
            .catch(() => {
              setIsLoading(false);
              swal.fire({
                icon: "error",
                title: "An error has ocurred!",
                confirmButtonColor: "#8a2b06",
              });
            });
        }
      });
  };

  return (
    <li className={classes.meal}>
      {isLoading && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}
      <div style={{ maxWidth: "80%" }}>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <img
          className={classes.icon}
          alt={"edit icon"}
          src={editIcon}
          onClick={() => navigate(`/edit-food/${props.id}`, { replace: false })}
        />
        <img
          className={classes.icon}
          alt={"delete icon"}
          src={deleteIcon}
          onClick={handleDelete}
        />
      </div>
    </li>
  );
};

export default FoodItem;
