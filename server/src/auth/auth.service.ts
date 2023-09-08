import { Injectable } from '@nestjs/common';
import { User } from '../data/model/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
      ) {}

    async validateUser(userName: string, password: string): Promise<any> {
        return await User.findByCredentials(userName, password);
    }

    async login(user: User) {
        const payload = { userName: user.userName, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
