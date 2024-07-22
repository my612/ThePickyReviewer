import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserDto, UserDto_Update } from './user.dto';
import { User } from 'database/entities/user.entity';
import { Followers } from 'database/entities/followers.entity';
import { Favorites } from 'database/entities/favorites.entity';
import { ToBeWatched } from 'database/entities/tobewatched.entity';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}
  @Post('/create')
  @ApiBody({ type: UserDto })
  async createUser(@Body() user: UserDto): Promise<boolean> {
    return this.userServices.createUser(user);
  }

  @Get('/get')
  async getRecordById(@Query('id') id: number): Promise<User> {
    const result = await this.userServices.getUserById(id);
    return result;
  }
  @Delete('/delete')
  async deleteRecordById(@Query('id') id: number): Promise<boolean> {
    return this.userServices.deleteUserById(id);
  }
  @Patch('/update')
  @ApiBody({ type: UserDto_Update })
  async updateRecordById(@Body() entry: UserDto_Update): Promise<boolean> {
    return this.userServices.updateUserByID(entry);
  }

  @Post('/addFollower')
  async addFollower(
    @Query('follower') followerId: number,
    @Query('followee') followeeId: number,
  ): Promise<boolean> {
    return this.userServices.addFollower(followerId, followeeId);
  }
  @Get('/followers')
  async getFollowers(@Query('id') id: number): Promise<User[]> {
    return this.userServices.getFollowers(id);
  }
  @Delete('/unfollow')
  async unfollow(
    @Query('follower') followerId: number,
    @Query('followee') followeeId: number,
  ): Promise<boolean> {
    return this.userServices.unfollow(followerId, followeeId);
  }

  @Get('/displayfavorites')
  async displayFavorites(@Query('userId') userId: number): Promise<Favorites[]> {
    return this.userServices.displayFavorites(userId);
  }
  @Get('/displaytobewatched')
  async displayToBeWatched(
    @Query('userId') userId: number,
  ): Promise<ToBeWatched[]> {
    return this.userServices.displayToBeWatched(userId);
  }
}
