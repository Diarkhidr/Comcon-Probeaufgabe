import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import constants from "./constants";
import { User } from 'src/data/model/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.jwtSecret,
    });
  }

  async validate(payload: any) {
    return await User.findOneOrFail(payload.sub);
  }
}