const pool = require("../db");

class userController {
  async createUser(req, res) {
    const { username, password } = req.body;
    const newUser = await pool.query(
      `insert into final.users (username,password) values ($1,$2)`,
      [username, password]
    );
    res.json(newUser.rows[0]);
  }
  async getUser(req, res) {
    const id = req.params.id;
    const user = await pool.query(`select * from final.users where id=${id}`);
    res.json(user.rows[0]);
  }
  async updatePassword(req, res) {}
  async deleteUser(req, res) {
    const id = req.params.id;
    const user = await pool.query(`delete from final.users where id=${id}`);
    res.json(user.rows[0]);
  }
}

module.exports = new userController();
