module.exports = (req, res) => {
  res.statusCode = 404;
  res.json({ message: "Invalid route" });
};
