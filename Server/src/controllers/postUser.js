const { User } = require("../DB_connection.js")

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).send("Faltan datos");
    }
    const user = await User.findOrCreate({
      where: {
      email,password
      }
    })
    return res.json(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
}
