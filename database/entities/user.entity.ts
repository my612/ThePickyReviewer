import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Reviews } from './reviews.entity';
import { Followers } from './followers.entity';

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Followers, (follower) => follower.follower)
  followers: Followers[];

  @OneToMany(() => Followers, (follower) => follower.followee)
  following: Followers[];

  @OneToMany(() => Reviews, (review) => review.user)
  reviews: Reviews[];

  @Column()
  date_created: Date;
}
