import { Body, Controller, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserAccount } from '../users.interface';
import { AuthService } from './auth.service';

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
}
