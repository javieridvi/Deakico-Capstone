import { Body, Controller, Post, Put, Request, UseGuards } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { map, Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { UserAccount } from '../users.interface';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //to check later
  @Post('register')
  register(@Body() user: UserAccount): Promise<Observable<UserAccount>> {
    return this.authService.registerAccount(user);
  }

  @Post('login')
  login(@Body() user: UserAccount): Observable<{ token: string }> {
      return this.authService
      .login(user)
      .pipe(map((jwt: string) => ({ token: jwt })));   
  }

  @UseGuards(JwtGuard)
  @Put('update-password')
  async updatePassword(@Request() req: any, @Body() body: UserAccount ): Promise<Observable<UpdateResult>> { 
    return this.authService.updatePassword(req.user.u_id, body.password).catch((err) => {
      throw new HttpException('Error while updating password!', HttpStatus.UNAUTHORIZED);
    });
  }
}
