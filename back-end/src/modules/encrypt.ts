//const bcrypt = require('bcrypt');

import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password: string){
  return bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(plainPassword: string, hashedPassword: string){
  return bcrypt.compare(plainPassword, hashedPassword);
}

