import { Body, Injectable, Post } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserDto_Update } from './user.dto';
import { ApiBody } from '@nestjs/swagger';
import { User } from 'database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Followers } from 'database/entities/followers.entity';
import { Favorites } from 'database/entities/favorites.entity';
import { ToBeWatched } from 'database/entities/tobewatched.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    @InjectRepository(Followers)
    private followers: Repository<Followers>,
    @InjectRepository(Favorites)
    private favorites: Repository<Favorites>,
    @InjectRepository(ToBeWatched)
    private toBeWatched: Repository<ToBeWatched>,
  ) {}

  async createUser(user: UserDto): Promise<boolean> {
    const result = await this.user.save(user);
    return result ? true : false;
  }
  async getUserById(id: number): Promise<User> {
    return this.user.findOne({ where: { id } });
  }
  async deleteUserById(id: number): Promise<boolean> {
    const result = await this.user.delete(id);
    return result.affected > 0;
  }
  async updateUserByID(entry: UserDto_Update): Promise<boolean> {
    const result = await this.user.update(entry.id, entry);
    return result.affected > 0;
  }
  async addFollower(followerId, followeeId): Promise<boolean> {
    const follower = await this.getUserById(followerId);
    const followee = await this.getUserById(followeeId);

    if (!follower || !followee) {
      throw new Error('Follower or followee not found');
    }

    // Step 2: Create a Followers instance
    const followerRecord = new Followers();
    followerRecord.follower = follower;
    followerRecord.followee = followee;

    // Step 3: Save the Followers record
    const result = this.followers.save(followerRecord);

    return result ? true : false;
  }
  async getFollowers(userId: number): Promise<User[]> {
    const followers = await this.followers.find({
      where: { followee: { id: userId } },
      relations: ['follower'],
    });

    return followers.map((f) => f.follower);
  }
  async unfollow(followerId: number, followeeId: number): Promise<boolean> {
    const follower = await this.getUserById(followerId);
    const followee = await this.getUserById(followeeId);
    const result = await this.followers.delete({ follower, followee });
    return result.affected > 0;
  }
  async displayFavorites(userId: number): Promise<Favorites[]> {
    return this.favorites.find({ where: { userId } });
  }
  async displayToBeWatched(userId: number): Promise<ToBeWatched[]> {
    return this.toBeWatched.find({ where: { userId } });
  }
}
