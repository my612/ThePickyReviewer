import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const admin = await this.adminService.findOne(username);
    if (admin?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = admin;
    if (admin?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: admin.userId, username: admin.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
