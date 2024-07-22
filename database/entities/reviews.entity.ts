import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Films } from './films.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['userId', 'filmId'])
export class Reviews {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @ApiProperty()
  userId: number; 

  @Column()
  @ApiProperty()
  filmId: number; 

  @ManyToOne(() => Films, (film) => film.id)
  @JoinColumn({ name: 'filmId' })
  film: Films;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  @ApiProperty()
  comment: string;

  @Column()
  @ApiProperty()
  rating: number;

  @CreateDateColumn()
  date_created: Date;
}
