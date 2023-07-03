/* eslint-disable camelcase */
const db = require('../../database');

class DesenvolvedoresRepository {
  async findAll(orderBy = 'ASC') {
    console.log('chamou');
    //Busca todos os registros
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT desenvolvedores.*, niveis.descricao as niveis_descricao
    FROM desenvolvedores
    LEFT JOIN niveis on niveis.id = desenvolvedores.nivel_id
    order by desenvolvedores.name ${direction}`);

    console.log([rows]);
    return rows;
  }

  async findById(id) {
    //Busca todos os registros
    const [row] = await db.query(`
    SELECT desenvolvedores.*, niveis.descricao as niveis_descricao
    FROM desenvolvedores
    LEFT JOIN niveis on niveis.id = desenvolvedores.nivel_id
    where desenvolvedores.id=$1 order by desenvolvedores.name asc`, [id]);
    return row;
  }

  async findByEmail(email) {
    //Busca todos os registros
    const [row] = await db.query('SELECT * FROM desenvolvedores where email=$1  order by name asc', [email]);
    return row;
  }

  async deleteById(id) {
    //Busca todos os registros
    const deleteOp = await db.query('DELETE FROM desenvolvedores where id =$1', [id]);
    return deleteOp;
  }

  async create({
    name, email, sexo, datanascimento, idade, hobby, nivel_id,
  }) {
    //Cria um novo registro
    const [row] = await db.query(`
      INSERT INTO desenvolvedores(name, email, sexo, datanascimento, idade, hobby , nivel_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
      `, [name, email, sexo, datanascimento, idade, hobby, nivel_id]);

    return row;
  }

  async update(id, {
    name, email, sexo, datanascimento, idade, hobby, nivel_id,
  }) {
    //Busca todos os registros
    const [row] = await db.query(`
      UPDATE desenvolvedores
      SET name = $1, email = $2, sexo = $3, datanascimento = $4, idade = $5, hobby = $6 , nivel_id = $7
      WHERE id = $8
      RETURNING *
    `, [name, email, sexo, datanascimento, idade, hobby, nivel_id, id]);

    return row;
  }
}

module.exports = new DesenvolvedoresRepository();
