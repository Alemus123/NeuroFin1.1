import { Controller, Post, BodyParams, Inject } from '@tsed/common';
import { Required, Example, Description } from '@tsed/schema';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/UserService';
import { Forbidden, Unauthorized } from '@tsed/exceptions';

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

class RegisterDto {
  @Required()
  @Description('Nombre del usuario')
  @Example('John')
  firstName!: string;

  @Required()
  @Description('Apellido del usuario')
  @Example('Doe')
  lastName!: string;

  @Required()
  @Description('Email del usuario')
  @Example('john.doe@example.com')
  email!: string;

  @Required()
  @Description('Contraseña del usuario')
  @Example('password123')
  password!: string;

  @Required()
  @Description('Tipo de personalidad financiera')
  @Example('conservador')
  financialPersonality!: string;
}

@Controller('/auth')
@Description('Autenticación de usuarios')
export class AuthController {
  constructor(@Inject() private userService: UserService) {}

  @Post('/register')
  @Description('Registrar un nuevo usuario')
  async register(@Description('Datos de registro') @BodyParams() registerData: RegisterDto) {
    console.log(`Intento de registro para: ${registerData.email}`);

    const existingUser = await this.userService.findByEmail(registerData.email);
    if (existingUser) {
      console.log(`Email ya registrado: ${registerData.email}`);
      throw new Forbidden('El email ya está registrado');
    }

    const user = await this.userService.create({
      ...registerData,
      role: 'user',
    });

    console.log(`Registro exitoso para: ${registerData.email}`);
    return {
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        financialPersonality: user.financialPersonality,
      },
    };
  }

  @Post('/login')
  @Description('Iniciar sesión en el sistema')
  async login(@Description('Credenciales de usuario') @BodyParams() credentials: LoginDto) {
    console.log(`Intento de login para: ${credentials.email}`);

    const user = await this.userService.findByEmail(credentials.email);

    if (!user) {
      console.log(`Usuario no encontrado: ${credentials.email}`);
      throw new Unauthorized('Usuario no encontrado');
    }

    const isValidPassword = await this.userService.validatePassword(user, credentials.password);

    if (!isValidPassword) {
      console.log(`Contraseña incorrecta para: ${credentials.email}`);
      throw new Unauthorized('Contraseña incorrecta');
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
        financialPersonality: user.financialPersonality,
      },
    };
  }
}
