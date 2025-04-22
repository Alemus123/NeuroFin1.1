import { Service } from '@tsed/di';
import { BadRequest } from '@tsed/exceptions';
import bcrypt from 'bcryptjs';
import { users } from '../data/users';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  financialPersonality?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  financialPersonality: string;
  role?: string;
}

@Service()
export class UserService {
  private users: User[];

  constructor() {
    try {
      this.users = users;
      console.log('Usuarios cargados correctamente:', this.users.length);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      this.users = [];
    }
  }

  async create(input: CreateUserInput): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const newUser: User = {
        id: (this.users.length + 1).toString(),
        ...input,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.users.push(newUser);
      console.log(`Usuario creado exitosamente: ${newUser.email}`);
      return newUser;
    } catch (error) {
      console.error('Error en create:', error);
      throw new BadRequest('Error al crear usuario');
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = this.users.find((user) => user.email === email);
      if (!user) {
        console.log(`Usuario no encontrado para email: ${email}`);
      }
      return user;
    } catch (error) {
      console.error('Error en findByEmail:', error);
      throw new BadRequest('Error al buscar usuario');
    }
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    try {
      const isValid = await bcrypt.compare(password, user.password);
      console.log(`Validación de contraseña para ${user.email}: ${isValid}`);
      return isValid;
    } catch (error) {
      console.error('Error en validatePassword:', error);
      throw new BadRequest('Error al validar contraseña');
    }
  }

  // Nota: La contraseña en el JSON está hasheada con "password123" para todos los usuarios
  // Puedes usar cualquiera de los emails: admin@neurofin.com, juan@neurofin.com, maria@neurofin.com
  // con la contraseña: password123
}
