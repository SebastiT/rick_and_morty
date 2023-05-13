import styles from "./Cards.module.css"
import Card from "../Card/Card";

const Cards = ({characters,onClose}) => {
  return (
    <div className={styles.cardContainer}>
        {characters.map((char) => {
           return (
             <Card
               id={char.id}
               name={char.name}
               status={char.status}
               species={char.species}
               gender={char.gender}
               origin={char.origin.name}
               image={char.image}
               onClose={onClose}
               key={char.id}
             />
           );
      })}
    </div>
  );
};

export default Cards;
