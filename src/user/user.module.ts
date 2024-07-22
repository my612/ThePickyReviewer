import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Followers } from 'database/entities/followers.entity';
import { Favorites } from 'database/entities/favorites.entity';
import { ToBeWatched } from 'database/entities/tobewatched.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Followers]), TypeOrmModule.forFeature([Favorites]), TypeOrmModule.forFeature([ToBeWatched]),],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
