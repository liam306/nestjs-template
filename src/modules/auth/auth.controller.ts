import { UserEntity } from '@/database';
import { Auth, DefaultResponses, User } from '@/shared/decorators';
import { LocalAuthGuard } from '@/shared/guards';
import { PromiseResponse } from '@/shared/interfaces';
import { TranslationService } from '@/shared/modules/translation/translation.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  SignInDto,
  SignInResponseDto,
  SignInResponseWrapperDto,
  SignUpDto,
  UserResponseDto,
} from './dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly i18n: TranslationService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @DefaultResponses({
    statusCodes: [400, 401, 500],
  })
  @Post('signup')
  async signup(@Body() signupDto: SignUpDto): PromiseResponse<UserEntity> {
    return this.authService.signup(signupDto);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInDto, description: 'Sign in' })
  @ApiResponse({
    status: 200,
    description: 'Sign in successfully',
    type: SignInResponseWrapperDto,
  })
  @DefaultResponses({
    statusCodes: [400, 500],
  })
  @Post('signin')
  async signin(@User() user: UserEntity): PromiseResponse<SignInResponseDto> {
    return this.authService.signin(user);
  }

  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Get current user successfully',
    type: UserResponseDto,
  })
  @DefaultResponses({
    statusCodes: [401, 500],
  })
  @Get('me')
  async getMe(@User() user: UserEntity): PromiseResponse<UserEntity> {
    return {
      message: this.i18n.t('common.success'),
      data: user,
    };
  }
}
