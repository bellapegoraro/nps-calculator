import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Nps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: string;

  @Column()
  score: number;

  @Column({ nullable: true })
  commentary: string;
}
