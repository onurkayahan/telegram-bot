import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { SeederService } from './seeder.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([]), UserModule, AuthModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
