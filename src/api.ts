"use client";

import axios from "axios";

const req = axios.create({
  baseURL: "https://dummyjson.com",
});

// Função para buscar os dados
export const getData = async (): Promise<any> => {
  const result = await req.get("/products"); // ✅ Apenas a barra, porque já definiu baseURL
  return result.data;
};
