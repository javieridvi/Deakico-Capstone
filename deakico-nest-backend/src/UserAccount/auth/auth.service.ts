import{ HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { from, map, Observable, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { UserAccountEntity } from '../users.entity';
import { UserAccount } from '../users.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserAccountEntity) 
        private readonly userRepository: Repository<UserAccountEntity>,
        private jwtService: JwtService
        )
        {}

    hashPassword(password: string): Observable<string> {
       return from(bcrypt.hash(password, 12)); //12 is the convention number for salts
    }

    registerAccount( user: UserAccount): Observable<UserAccount> {
        const { u_firstname, u_lastname, username ,email, password, pa_id} = user;
        return this.hashPassword(password).pipe(
            switchMap((hashedPassword: string) => {
                return from(this.userRepository.save({
                    u_firstname,
                    u_lastname,
                    username,
                    email,
                    password: hashedPassword,
                    pa_id
                 })).pipe(
                    map((user: UserAccount) => {
                        delete user.password;
                        return user;
                    }),
                 );
            }),
        );
    }

    validateUser(email: string, password: string): Observable<UserAccount> {
        return from(this.userRepository.findOneBy(
            { email: email },
        ),
        ).pipe(
            switchMap((user: UserAccount) => 
                from(bcrypt.compare(password, user.password)).pipe(
                    map((isValidPassword: boolean) => {
                        if (isValidPassword) {
                            delete user.password;
                            return user;
                        }
                    }),
                ),
            ),
        );
    }

    //consider login with username as well
    login(user: UserAccount): Observable<string> {
        const { email, password } = user;
        return this.validateUser(email, password).pipe(
            switchMap((user: UserAccount) => {
                if (user) {
                    // create JWT - credentials
                    return from(this.jwtService.signAsync({ user }));
                }
            })
        );
    }
}
