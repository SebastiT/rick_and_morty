import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";
import { useState, useEffect } from "react";

export const Card = ({
  id,
  name,
  status,
  species,
  gender,
  origin,
  image,
  onClose,
  addFav,
  removeFav,
  myFavorites,
}) => {
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    if (isFav === true) {
      setIsFav(false);
      removeFav(id);
    } else {
      setIsFav(true);
      addFav({ id, name, status, species, gender, origin, image });
    }
  };

  useEffect(() => {
    myFavorites?.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <button
          className={styles.button}
          onClick={() => {
            onClose(id);
          }}
        >
          X
        </button>
        <img className={styles.image} src={image} alt={`${name}`} />
      </div>
      <div className={styles.text}>
        <Link to={`/detail/${id}`}>
          <h1>{name}</h1>
        </Link>
        <h2>{status}</h2>
        <h2>{species}</h2>
        <h2>{gender}</h2>
        <h2>{origin}</h2>
        <button onClick={handleFavorite}>{isFav ? "❤️" : "🤍"}</button>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    addFav: (character) => {
      dispatch(addFav(character));
    },
    removeFav: (id) => {
      dispatch(removeFav(id));
    },
  };
}

function mapStateToProps(state) {
  return {
    myFavorites: state.myFavorites,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
