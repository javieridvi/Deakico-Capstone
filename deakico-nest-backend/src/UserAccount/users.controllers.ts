import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtGuard } from './auth/guards/jwt.guard';
import { UserAccount } from './users.interface';
import { UserAccountService } from './users.service';

@Controller('users')
export class UserAccountController {
  constructor(private readonly usersService: UserAccountService) {}

  @Post() //unnused. Instead using the register request in auth.controllers.ts
  insertUser(@Body() user: UserAccount): Observable<UserAccount> {
    return this.usersService.insertUser(user);
  }

  @Get()
  getAllUsers(): Observable<UserAccount[]> {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtGuard)
  @Get('user')
  getUser(@Request() req: any): Observable<UserAccount> {
    return this.usersService.getUser(req.user.u_id);
  }

  @UseGuards(JwtGuard)
  @Put()
  updateUser(
    @Request() req: any,
    @Body() user: UserAccount,
  ): Observable<UpdateResult> {
    return this.usersService.updateUser(req.user.u_id, user);
  }

  @UseGuards(JwtGuard)
  @Delete()
  deleteUser(@Request() req: any): Observable<DeleteResult> {
    return this.usersService.deleteUser(req.user.u_id);
  }
}
