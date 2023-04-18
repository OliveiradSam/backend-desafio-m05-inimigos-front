const {knex} = require("../service/instance");
const {isValidEmail} = require("../utils/validateFormat");
const {findAddress} = require("./../utils/findAdress");

const registerClient = async (req, res) => {
  const {name, email, cpf, phone, cep, complement} = req.body;

  if (!name || !email || !cpf || !phone) {
    return res.status(401).json("Todos os campos são obrigatórios!");
  }

  if (!isValidEmail(email)) {
    return res.status(400).json("Informe um email válido");
  }
  try {
    const existingEmail = await knex("client").where({email}).first();
    const existingcpf = await knex("client").where({cpf}).first();

    if (existingEmail) {
      return res.status(400).json("Email já cadastrado");
    } else if (existingcpf) {
      return res.status(400).json("CPF já cadastrado");
    }

    const {street, neighborhood, localidade, uf} = await findAddress(cep);

    const client = await knex("client")
      .insert({
        name,
        email,
        cpf,
        phone,
        cep,
        street,
        complement,
        neighborhood,
        city: localidade,
        uf
      })
      .returning("*");
    if (!client) {
      return res.status(400).json("Erro ao cadastrar client");
    }
    return res.status(200).json("Cliente cadastrado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {registerClient};
