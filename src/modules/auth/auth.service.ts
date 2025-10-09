import { RepositoryService, UserEntity } from '@/database';
import { PromiseResponse } from '@/shared/interfaces';
import { TranslationService } from '@/shared/modules/translation/translation.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignInResponseDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly jwtService: JwtService,
    private readonly i18n: TranslationService,
  ) {}

  async signup(signupDto: SignUpDto): PromiseResponse<UserEntity> {
    const existingUserByUsername = await this.repositoryService.user.findOneBy({
      username: signupDto.username,
    });
    if (existingUserByUsername) {
      throw new BadRequestException({
        message: this.i18n.t('validation.fieldExisted', {
          args: { field: 'Username' },
        }),
      });
    }
    if (signupDto.email) {
      const existingUserByEmail = await this.repositoryService.user.findOneBy({
        email: signupDto.email,
      });
      if (existingUserByEmail) {
        throw new BadRequestException({
          message: this.i18n.t('validation.fieldExisted', {
            args: { field: 'Email' },
          }),
        });
      }
    }

    const newUser: UserEntity = await this.repositoryService.user.save({
      ...signupDto,
      password: await bcrypt.hash(signupDto.password, 10),
    });
    delete newUser.password;

    return {
      message: this.i18n.t('auth.signupSuccess'),
      data: newUser,
    };
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.repositoryService.user.findOneBy({
      username,
    });
    if (!user) {
      throw new BadRequestException({
        message: this.i18n.t('auth.invalidCredentials'),
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new BadRequestException({
        message: this.i18n.t('auth.invalidCredentials'),
      });
    }

    delete user.password;
    return user;
  }

  async signin(user: UserEntity): PromiseResponse<SignInResponseDto> {
    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
      username: user.username,
    });

    return {
      message: this.i18n.t('auth.signinSuccess'),
      data: {
        user,
        accessToken: token,
      },
    };
  }
}
