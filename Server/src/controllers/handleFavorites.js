var myFavorites = [];

const postFav = (req, res) => {
  const favChar = req.body;
  myFavorites.push(favChar);
  res.json(myFavorites);
};

const deleteFav = (req, res) => {
  const { id } = req.params;
  myFavorites = myFavorites.filter((char) => char.id !== +id);
  res.json(myFavorites);
};

module.exports = {
  postFav,
  deleteFav
}
