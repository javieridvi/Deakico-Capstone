import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { throws } from "assert";
import { Observable } from "rxjs";
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
    getAllUsers(){
        return this.usersService.getAllUsers();
    }

    @Get(':u_id')
    getRequest(@Param('u_id') u_Id: number,) {
        return this.usersService.getUser(u_Id);
    }
}