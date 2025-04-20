import { Service } from "@tsed/di";
import { BadRequest } from "@tsed/exceptions";
import { readFileSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

@Service()
export class UserService {
  private users: User[];

  constructor() {
    const usersData = readFileSync(join(__dirname, "../data/users.json"), "utf-8");
    this.users = JSON.parse(usersData).users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  // Nota: La contraseña en el JSON está hasheada con "password123" para todos los usuarios
  // Puedes usar cualquiera de los emails: admin@neurofin.com, juan@neurofin.com, maria@neurofin.com
  // con la contraseña: password123
} 