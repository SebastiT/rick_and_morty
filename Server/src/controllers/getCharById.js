const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character";

const getCharById = async (req, res) => {
  const { id } = req.params;
  // axios(`${URL}/${id}`)
  //   .then((response) => response.data)
  //   .then(({ id, status, name, species, origin, image, gender }) => {
  //     if (name) {
  //      return res.json({ id, status, name, species, origin, image, gender });
  //     }
  //     return res.status(404).send("Not found")
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error.message);
  //   });
  try {
    const { data } = await axios(`${URL}/${id}`);
    if (data.name) {
      return res.json({
        id: data.id,
        status: data.status,
        name: data.name,
        species: data.species,
        origin: data.origin,
        image: data.image,
        gender: data.gender,
      });
    }
    return res.status(404).send("Not found");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getCharById };
