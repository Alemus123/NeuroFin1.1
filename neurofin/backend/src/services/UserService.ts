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
    try {
      const usersData = readFileSync(join(__dirname, "../data/users.json"), "utf-8");
      this.users = JSON.parse(usersData).users;
      console.log("Usuarios cargados correctamente:", this.users.length);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      this.users = [];
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = this.users.find(user => user.email === email);
      if (!user) {
        console.log(`Usuario no encontrado para email: ${email}`);
      }
      return user;
    } catch (error) {
      console.error("Error en findByEmail:", error);
      throw new BadRequest("Error al buscar usuario");
    }
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    try {
      const isValid = await bcrypt.compare(password, user.password);
      console.log(`Validación de contraseña para ${user.email}: ${isValid}`);
      return isValid;
    } catch (error) {
      console.error("Error en validatePassword:", error);
      throw new BadRequest("Error al validar contraseña");
    }
  }

  // Nota: La contraseña en el JSON está hasheada con "password123" para todos los usuarios
  // Puedes usar cualquiera de los emails: admin@neurofin.com, juan@neurofin.com, maria@neurofin.com
  // con la contraseña: password123
}
