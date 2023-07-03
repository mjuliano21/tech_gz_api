const NiveisRepository = require('../repositories/NiveisRepository');
const isValidUUID = require('../../utils/isValidUUID');

class NivelController {
  async index(request, response) {
    //Listar todos os registros
    const { orderBy } = request.query;

    const nivel = await NiveisRepository.findAll(orderBy);
    response.json(nivel);
  }

  async show(request, response) {
    //Obter um registro
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(404).json({ error: 'Nível invalido' });
    }
    const nivel = await NiveisRepository.findById(id);

    if (!nivel) {
      return response.status(404).json({ erro: 'Nivel não localizado' });
    }
    response.status(200).json(nivel);
  }

  async store(request, response) {
    //Criar um novo registro
    const {
      descricao,
    } = request.body;

    if (!descricao) {
      return response.send(400, { error: 'Nível não informado' });
    }

    const nivel = await NiveisRepository.create({
      descricao,
    });

    response.json(nivel);
  }

  async update(request, response) {
    //Atualiza um registro
    const { id } = request.params;
    const {
      descricao,
    } = request.body;

    if (!descricao) {
      return response.send(400, { error: 'Nível não informado' });
    }

    const nivel = await NiveisRepository.update(id, {
      descricao,
    });

    response.json(nivel);
  }

  async delete(request, response) {
    //Deleta um registro
    const { id } = request.params;

    const NivelVinculadoDesenvolvedor = await NiveisRepository.findByDesenvolvedores(id);

    if (NivelVinculadoDesenvolvedor) { //Porque 501???
      return response.send(501, { error: 'Nivél já associado a um ou mais desenvolvedores' });
    }

    await NiveisRepository.deleteById(id);
    response.sendStatus(204);
  }
}

//Singleton
module.exports = new NivelController();
