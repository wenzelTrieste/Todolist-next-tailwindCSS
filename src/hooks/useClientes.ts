import { useState } from "react";
import { useEffect } from "react";
import ColecaoCliente from "../backend/db/ColecaoCliente";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/clienteRepositorio";
import useTabelaOrForm from "./useTabelaOrForm";

export default function useClientes() {
  const repo: ClienteRepositorio = new ColecaoCliente();

  const { tabelaVisivel, formularioVisivel, exibirFormulario, exibirTabela } =
    useTabelaOrForm();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());

  useEffect(obterTodos, []);

  function obterTodos() {
    repo.obterTodos().then((clientes) => {
      setClientes(clientes);
      exibirTabela();
    });
  }

  function selecionarCliente(cliente: Cliente) {
    setCliente(cliente);
    exibirFormulario();
  }
  function novoCliente() {
    setCliente(Cliente.vazio());
    exibirFormulario();
  }
  async function excluirCliente(cliente: Cliente) {
    await repo.excluir(cliente);
    obterTodos();
  }

  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente);
    obterTodos();
  }

  return {
    tabelaVisivel,
    exibirTabela,
    cliente,
    clientes,
    novoCliente,
    salvarCliente,
    excluirCliente,
    selecionarCliente,
    obterTodos,
  };
}
