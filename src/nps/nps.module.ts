import { Module } from '@nestjs/common';
import { NpsController } from './nps.controller';
import { NpsService } from './nps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nps } from './nps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nps])],
  controllers: [NpsController],
  providers: [NpsService],
})
export class NpsModule {}
