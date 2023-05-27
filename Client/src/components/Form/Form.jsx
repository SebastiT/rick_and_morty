import { useState } from "react";
import validation from "./validation";
import styles from "./Form.module.css";
import logo from "../../images/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png"

const Form = ({ login }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validation({
        ...userData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form}>
          <img className={styles.image} src={logo} alt="Rick and Morty" />
          <div className={styles.group}>
            <input
              className={styles.input}
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
            <label className={styles.label}>Email</label>
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className={styles.group}>
            <input
              className={styles.input}
              type="text"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <label className={styles.label}>Password</label>
            {errors.password && <p>{errors.password}</p>}
          </div>
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
