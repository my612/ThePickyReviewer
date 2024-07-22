import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  Unique,
  CreateDateColumn,
} from 'typeorm';
import { Reviews } from './reviews.entity';
import { Followers } from './followers.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany(() => Followers, (follower) => follower.follower)
  followers: Followers[];

  @OneToMany(() => Followers, (follower) => follower.followee)
  following: Followers[];

  @OneToMany(() => Reviews, (review) => review.user)
  reviews: Reviews[];

  @CreateDateColumn()
  date_created: Date;
  @Column()
  date_updated: Date;
}
