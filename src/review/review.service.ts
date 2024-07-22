import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from 'database/entities/reviews.entity';
import { Repository } from 'typeorm';
import { ReviewDto } from './reviews.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Reviews)
    private review: Repository<Reviews>,
  ) {}

  async postReview(review: Reviews): Promise<boolean> {
    const result = await this.review.save(review);
    return result ? true : false;
  }
}
