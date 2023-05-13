import { connect } from "react-redux";
import Card from "../Card/Card";
import { filterCards, orderCards } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./Favorites.module.css";

export const Favorites = ({ myFavorites }) => {
  const dispatch = useDispatch();

  const [aux, setAux] = useState(false);

  const handleOrder = (event) => {
    setAux(true);
    dispatch(orderCards(event.target.value));
  };

  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value));
  };

  return (
    <div>
      <div>
        <select onChange={handleOrder}>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
        <select onChange={handleFilter}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">unknown</option>
        </select>
      </div>
      <div className={styles.cardContainer}>
        {myFavorites?.map((char) => {
          return (
            <Card
              id={char.id}
              name={char.name}
              status={char.status}
              species={char.species}
              gender={char.gender}
              origin={char.origin.name}
              image={char.image}
              key={char.id}
            />
          );
        })}
      </div>
    </div>
  );
};

function mapDispatchToProps(state) {
  return {
    myFavorites: state.myFavorites,
  };
}

export default connect(mapDispatchToProps, null)(Favorites);
