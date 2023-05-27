import "./App.css";
import Nav from "./components/Nav/Nav";
import Cards from "./components/Cards/Cards";
import About from "./components/About/About";
import Form from "./components/Form/Form";
import Detail from "./components/Detail/Detail";
import { useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Favorites from "./components/Favorites/Favorites";

function App() {
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();

  async function login(userData) {
    // axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
      //   const { access } = data;
      //   setAccess(data);
      //   access && navigate("/home");
      // });
      const { email, password } = userData;
      const URL = "http://localhost:3001/rickandmorty/login/";
      const { data } = await axios(
        URL + `?email=${email}&password=${password}`
      );
        const { access } = data;
        setAccess(data);
        access && navigate("/home");
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  const [characters, setCharacters] = useState([]);

  async function onSearch(id) {
    // axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
    //   ({ data }) => {
    //     if (data.id) {
    //       setCharacters((oldChars) =>
    //         [...oldChars, data].filter((objeto, indice, array) => {
    //           return !array
    //             .slice(0, indice)
    //             .some((obj) => obj.id === objeto.id);
    //         })
    //       );
    //     } else {
    //       window.alert("¡No hay personajes con este ID!");
    //     }
    //   }
    // );
    try {
      const { data } = await axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      );

      setCharacters((oldChars) =>
        [...oldChars, data].filter((objeto, indice, array) => {
          return !array.slice(0, indice).some((obj) => obj.id === objeto.id);
        })
      );
    } catch (error) {
      window.alert("¡No hay personajes con este ID!");
    }
  }

  const onClose = (id) => {
    const newChars = characters.filter((character) => {
      return character.id !== parseInt(id, 10);
    });

    setCharacters(newChars);
  };

  return (
    <div className="App">
      <Nav onSearch={onSearch} />
      <Routes>
        <Route
          path="/home"
          element={<Cards onClose={onClose} characters={characters} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/" element={<Form login={login} />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
