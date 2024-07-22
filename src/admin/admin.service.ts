import { Injectable } from '@nestjs/common';

export type Admin = any;
@Injectable()
export class AdminService {
  private readonly admins = [
    {
      userId: 1,
      username: 'nicolas',
      password: '5057',
    },

  ];
  async findOne(username: string): Promise<Admin | undefined> {
    return this.admins.find(admin => admin.username === username);
  }
}
