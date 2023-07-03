/* eslint-disable camelcase */
const isValidUUID = require('../../utils/isValidUUID');
const DesenvolvedoresRepository = require('../repositories/DesenvolvedoresRepository');

class DesenvolvedorController {
  async index(request, response) {
    //Listar todos os registros
    const { orderBy } = request.query;
    const desenvolvedores = await DesenvolvedoresRepository.findAll(orderBy);
    response.json(desenvolvedores);
  }

  async show(request, response) {
    //Obter um registro
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: 'Desenvolvedor invalido' });
    }

    const desenvolvedor = await DesenvolvedoresRepository.findById(id);

    if (!desenvolvedor) {
      return response.status(404).json({ error: 'Desenvolvedor não encontrado' });
    }
    response.status(200).json(desenvolvedor);
  }

  async store(request, response) {
    //Criar um novo registro
    const {
      name, email, sexo, datanascimento, idade, hobby, nivel_id,
    } = request.body;

    if (nivel_id && !isValidUUID(nivel_id)) {
      return response.status(404).json({ error: 'Nível inválida' });
    }

    if (email) {
      const desenvolvedorExist = await DesenvolvedoresRepository.findByEmail(email);

      if (desenvolvedorExist) {
        return response.send(400, { error: 'Email já cadastrado' });
      }
    }

    const desenvolvedor = await DesenvolvedoresRepository.create({
      name,
      email,
      sexo,
      datanascimento,
      idade,
      hobby,
      nivel_id,
    });

    response.send(desenvolvedor);
  }

  async update(request, response) {
    //Atualiza um registro
    const { id } = request.params;
    const {
      name,
      email,
      sexo,
      datanascimento,
      idade,
      hobby,
      nivel_id,

    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: 'Desenvolvedor não encontrado' });
    }

    if (nivel_id && !isValidUUID(nivel_id)) {
      return response.status(404).json({ error: 'Nível inválida' });
    }

    if (!name) {
      return response.send(400, { error: 'Nome não informado' });
    }

    const desenvolvedorExist = await DesenvolvedoresRepository.findById(id);

    if (!desenvolvedorExist) {
      return response.status(404).json({ ErrorEvent: 'Desenvolvedor não encontrado' });
    }

    if (email) {
      const desenvolvedorExistByEmail = await DesenvolvedoresRepository.findByEmail(email);

      if (desenvolvedorExistByEmail && desenvolvedorExistByEmail.id !== id) {
        return response.send(400, { error: 'Email já cadastrado' });
      }
    }

    const desenvolvedor = await DesenvolvedoresRepository.update(id, {
      name,
      email,
      sexo,
      datanascimento,
      idade,
      hobby,
      nivel_id,
    });

    response.send(desenvolvedor);
  }

  async delete(request, response) {
    //Deleta um registro

    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: 'Desenvolvedor não encontrado' });
    }

    await DesenvolvedoresRepository.deleteById(id);
    response.sendStatus(204);
  }
}

//Singleton
module.exports = new DesenvolvedorController();
