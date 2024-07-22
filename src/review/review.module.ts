import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from 'database/entities/reviews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reviews])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
