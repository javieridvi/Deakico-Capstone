import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { throws } from "assert";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
import { UserAccount } from "./users.interface";
import { UserAccountService } from "./users.service";

@Controller('users')
export class UserAccountController {
    constructor(private readonly usersService: UserAccountService) {}

    @Post()
    insertUser(@Body() user: UserAccount): Observable<UserAccount> {
        return this.usersService.insertUser(user);
    }

    @Get()
    getAllUsers(): Observable<UserAccount[]>{
        return this.usersService.getAllUsers();
    }

    @Get(':u_id')
    getUser(@Param('u_id') u_Id: number,): Observable<UserAccount> {
        return this.usersService.getUser(u_Id);
    }

    @Put(':u_id')
    updateUser(
        @Param('u_id') u_Id: number,
        @Body() user: UserAccount,
    ): Observable<UpdateResult> {
        return this.usersService.updateUser(u_Id, user);
    }

    @Delete(':u_id')
    deleteUser(
        @Param('u_id') u_Id: number,): Observable<DeleteResult> {
            return this.usersService.deleteUser(u_Id);
    }
}