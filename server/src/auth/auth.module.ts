import { Module } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import constants from "./constants";
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule, DataModule, JwtModule.register({
    secret: constants.jwtSecret,
    signOptions: { expiresIn: '12h' },
  })],
  providers: [LocalStrategy, AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
