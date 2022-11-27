import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserAccountEntity } from './users.entity';
import { UserAccount } from './users.interface';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(UserAccountEntity)
    private readonly userRepository: Repository<UserAccountEntity>,
  ) {}

  insertUser(user: UserAccount): Observable<UserAccount> {
    return from(this.userRepository.save(user));
  }

  getAllUsers(): Observable<UserAccount[]> {
    return from(this.userRepository.find());
  }

  getUser(u_id): Observable<UserAccount> {
    return from(this.userRepository.findOneBy({ u_id: u_id }));
  }

  updateUser(u_id: number, user: UserAccount): Observable<UpdateResult> {
    return from(this.userRepository.update(u_id, user));
  }

  addProvider(u_id: number, providerId: number): Observable<UpdateResult> {
    const user = { pa_id: providerId };
    return from(this.userRepository.update(u_id, user));
  }

  deleteUser(u_id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(u_id));
  }
}
