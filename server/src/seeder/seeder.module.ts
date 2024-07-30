import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([]), UserModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
