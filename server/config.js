module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  serverURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://<url-of-your-backend>",
};
