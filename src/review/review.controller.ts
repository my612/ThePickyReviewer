import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './reviews.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Reviews } from 'database/entities/reviews.entity';
@ApiTags('Review')
@Controller('review')
export class ReviewController {

    constructor(private readonly reviewServices: ReviewService) {}

    @Post('/post')
    @ApiBody({ type: Reviews })
    async postReview(@Body() review: Reviews): Promise<boolean> {
        return this.reviewServices.postReview(review);
    }

    
}
