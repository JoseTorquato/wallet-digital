import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/AuthService';
import { ResetPasswordDto } from '../dtos/ResetPasswordDTO';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiProperty()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('reset-password')
  @ApiResponse({ status: HttpStatus.OK, type: ResetPasswordDto })
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() ResetPasswordDto: ResetPasswordDto) {
    console.log(ResetPasswordDto);
    return { message: 'Solicitação de redefinição de senha recebida' };
  }
}
