import { Controller, Post, BodyParams, Inject } from '@tsed/common';
import { Required, Example, Description } from '@tsed/schema';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/UserService';

class LoginDto {
  @Required()
  @Description('Email del usuario')
  @Example('admin@neurofin.com')
  email!: string;

  @Required()
  @Description('Contraseña del usuario')
  @Example('password123')
  password!: string;
}

@Controller('/auth')
@Description('Autenticación de usuarios')
export class AuthController {
  constructor(@Inject() private userService: UserService) {}

  @Post('/login')
  @Description('Iniciar sesión en el sistema')
  async login(@Description('Credenciales de usuario') @BodyParams() credentials: LoginDto) {
    try {
      console.log(`Intento de login para: ${credentials.email}`);

      const user = await this.userService.findByEmail(credentials.email);

      if (!user) {
        console.log(`Usuario no encontrado: ${credentials.email}`);
        return {
          success: false,
          message: 'Usuario no encontrado',
        };
      }

      const isValidPassword = await this.userService.validatePassword(user, credentials.password);

      if (!isValidPassword) {
        console.log(`Contraseña incorrecta para: ${credentials.email}`);
        return {
          success: false,
          message: 'Contraseña incorrecta',
        };
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET || 'default-secret',
        { expiresIn: '1h' },
      );

      console.log(`Login exitoso para: ${credentials.email}`);
      return {
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: 'Error en el servidor',
      };
    }
  }
}
