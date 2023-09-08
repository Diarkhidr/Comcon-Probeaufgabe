import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
@Module({
  imports: [AuthModule, DataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
