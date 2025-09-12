import dados from "./../models/dados.js";
const { barbies } = dados;

// GET /bruxos - Listar todos os bruxos com filtros
const getAllBarbie = (req, res) => {
  const { nome, profissao, anoLancamento } = req.query;
  let resultado = barbies;
  console.log(resultado);

  // Filtro por nome (busca parcial)
  if (nome) {
    resultado = resultado.filter((barbie) =>
      barbie.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  // Filtro por casa de Hogwarts
  if (profissao) {
    resultado = resultado.filter(
      (barbie) => barbie.casa.toLowerCase() === profissao.toLowerCase()
    );
  }

  // Filtro por nível de magia
  if (anoLancamento) {
    resultado = resultado.find(
      (barbie) => barbie.anoLancamento === anoLancamento
    );
  }

  res.status(200).json({
    total: resultado.length,
    barbies: resultado,
  });
};

const getBarbieById = (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  const barbie = barbies.find((b) => b.id === id);
  if (barbie) {
    res.status(200).json(barbie);
  } else {
    res.status(404).json({
      success: false,
      error: "barbies não encontradas",
      message: "Nenhuma Barbie",
      codigo: "WIZARD_NOT_FOUND",
    });
  }
};

const createBarbie = (req, res) => {
  // Acessando dados do body
  //mudar o nodemon para node no package
  const { nome, profissão, anoLancamento } = req.body;
  console.log("Dados recebidos:", req.body);

  // Validação básica
  if (!nome || !profissão) {
    return res.status(400).json({
      success: false,
      message: "Nome e Profissão são obrigatórios para uma barbie!",
    });
  }

  // Criar nova barbie
  const novaBarbie = {
    id: barbies.length + 1,
    nome,
    profissão: profissão,
    anoLancamento: anoLancamento,
  };

  // Adicionar à lista de bruxos
  barbies.push(novaBarbie);

  res.status(201).json({
    success: true,
    message: "Nova Barbie adicionada a lista!",
    data: novaBarbie,
  });
};

//New
//Deletar uma barbie
const deleteBarbie = (req, res) => {
  let id = parseInt(req.params.id);

  //verificar se esse id existe!
  const barbieParaRemover = barbies.find((b) => b.id === id);

  if (!barbieParaRemover) {
    return res.status(404).json({
      success: false,
      message: `Esta barbie não existe, ${id}`,
    });
  }
  const barbiesFiltradas = barbies.filter((barbie) => barbie.id != id);

  barbies.splice(0, barbies.length, ...barbiesFiltradas);

  res.status(200).json({
    success: true,
    message: `barbie removida com sucesso`,
    barbieRemovida: barbieParaRemover,
  });
};

export { getAllBarbie, getBarbieById, createBarbie, deleteBarbie };
