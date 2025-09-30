import { Pool } from "pg";
import InvariantError from '../exceptions/InvariantError.js'

export default class AuthenticationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addRefreshToken(token) {
    await this._pool.query({
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token]
    });
  }

  async deleteRefreshToken(token) {
    await this._pool.query({
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token]
    });
  }
}