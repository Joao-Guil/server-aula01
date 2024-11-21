import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();

routes(app); // Aplica as rotas definidas em postsRoutes.js

app.listen(3000, () => {
  console.log("Servidor escutando na porta 3000..."); // Indica a porta de escuta
});