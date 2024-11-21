import express from "express";
import multer from "multer";
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
} from "../controllers/postsController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Pasta de destino para os uploads de imagens
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // O nome do arquivo será o nome original
  },
});

const upload = multer({ dest: "./uploads", storage });

// Opção alternativa para Linux/Mac: apenas a pasta de destino
// const upload = multer({ dest: "./uploads"});

const routes = (app) => {
  app.use(express.json()); // Habilita o parseamento de dados JSON na requisição

  app.get("/posts", listarPosts); // Rota GET para listar posts
  app.post("/posts", postarNovoPost); // Rota POST para criar um novo post
  app.post("/upload", upload.single("imagem"), uploadImagem); // Rota POST para upload de imagem e criação de post
};

export default routes;