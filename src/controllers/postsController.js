import { getTodosPosts, criarPost } from "../models/postsModel.js";
import fs from "fs";
import { validationResult } from 'express-validator'; // Adiciona validação de dados

// Função para listar todos os posts
export async function listarPosts(req, res) {
  try {
    // Chama a função do modelo para buscar todos os posts
    const posts = await getTodosPosts();
    // Retorna uma resposta HTTP com status 200 e os posts em formato JSON
    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    // Retorna uma resposta HTTP com status 500 e uma mensagem de erro mais informativa
    res.status(500).json({ error: "Ocorreu um erro ao buscar os posts. Por favor, tente novamente mais tarde." });
  }
}

// Função para criar um novo post
export async function postarNovoPost(req, res) {
  // Valida os dados do novo post (exemplo usando express-validator)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const novoPost = req.body;
  try {
    // Chama a função do modelo para criar o novo post
    const postCriado = await criarPost(novoPost);
    // Retorna uma resposta HTTP com status 200 e o post criado
    res.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    // Retorna uma resposta HTTP com status 500 e uma mensagem de erro mais informativa
    res.status(500).json({ error: "Ocorreu um erro ao criar o post. Por favor, tente novamente mais tarde." });
  }
}

// Função para realizar o upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Valida o arquivo de imagem (tamanho, tipo, etc.)
  // ... (implementar validação)

  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  try {
    // Chama a função do modelo para criar o novo post
    const postCriado = await criarPost(novoPost);
    // Renomeia o arquivo da imagem para um nome único
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada);
    // Retorna uma resposta HTTP com status 200 e o post criado
    res.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    // Remove o arquivo temporário da imagem em caso de erro
    fs.unlinkSync(req.file.path);
    // Retorna uma resposta HTTP com status 500 e uma mensagem de erro mais informativa
    res.status(500).json({ error: "Ocorreu um erro ao fazer o upload da imagem. Por favor, tente novamente mais tarde." });
  }
}