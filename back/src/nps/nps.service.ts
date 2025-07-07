import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nps } from './nps.entity';

@Injectable()
export class NpsService {
  constructor(
    @InjectRepository(Nps)
    private npsRepository: Repository<Nps>,
  ) {}

  create(data: Partial<Nps>) {
    const newData = this.npsRepository.create(data);
    return this.npsRepository.save(newData);
  }

  findAll() {
    return this.npsRepository.find();
  }
}
