import { getTodosPosts, criarPost } from "../models/postsModels.js";
import fs from "fs"; // Módulo para interagir com o sistema de arquivos

export async function listarPosts(_req, res) {
  const posts = await getTodosPosts();
  res.status(200).json(posts); // Retorna a lista de posts em JSON
}

export async function postarNovoPost(req, res) {
  const novoPost = req.body; // O novo post está no corpo da requisição
  try {
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado); // Retorna o post recém-criado
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" }); // Erro genérico
  }
}

export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname, // URL da imagem é o nome original do arquivo
    alt: "",
  };

  try {
    const postCriado = await criarPost(novoPost);
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`; // Novo nome da imagem

    fs.renameSync(req.file.path, imagemAtualizada); // Renomeia o arquivo da imagem
    res.status(200).json(postCriado); // Retorna o post recém-criado
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" }); // Erro genérico
  }
}