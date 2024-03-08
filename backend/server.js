import coonnectDatabase from "./config/database.js";
import app from "./index.js";

coonnectDatabase();

const PORT = process.env.PORT || 8080;

process.on("uncaughtException", (err) => {
  console.log("uncaughtException" + err.message);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Server is started on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("uncaughtException" + err.message);
  server.close;
  () => {
    process.exit(1);
  };
});
