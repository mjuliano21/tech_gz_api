// eslint-disable-next-line import/no-extraneous-dependencies
const db = require('../../database');

class NiveisRepository {
  async findAll(orderBy = 'ASC') {
    //Busca todos os registros
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`select nv.id, nv.descricao,
    (select count(*) from desenvolvedores dev where nv.id = dev.nivel_id) as qtd_dev
    from niveis nv  ORDER BY nv.id ${direction}
    `);

    return rows;
  }

  async findById(id) {
    //Busca por id
    const [row] = await db.query('SELECT * FROM niveis where id=$1 order by descricao asc', [id]);
    return row;
  }

  async findByDesenvolvedores(id) {
    //Busca desenvolvedores ligados a um nivel
    const [row] = await db.query('SELECT * FROM desenvolvedores where nivel_id=$1', [id]);
    return row;
  }

  async deleteById(id) {
    //Deletar por id
    const deleteOp = await db.query('DELETE FROM niveis where id =$1', [id]);
    return deleteOp;
  }

  async create({
    descricao,
  }) {
    //Cria um novo registro
    const [row] = await db.query(`
      INSERT INTO niveis(descricao)
      VALUES ($1) RETURNING *
    `, [descricao]);

    return row;
  }

  async update(id, {
    descricao,
  }) {
    //Atualiza um registro
    const [row] = await db.query(`
      UPDATE niveis
      SET descricao = $1
      WHERE id = $2
      RETURNING *
    `, [descricao, id]);

    return row;
  }
}

module.exports = new NiveisRepository();
