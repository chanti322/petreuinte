module.exports = {
  serverURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "http://appfindmypet.herokuapp.com/",
};
