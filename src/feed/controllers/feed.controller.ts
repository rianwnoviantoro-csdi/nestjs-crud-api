import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { Feed } from '../models/feed.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() post: Feed, @Request() request: any): Observable<Feed> {
    return this.feedService.createFeed(request.user, post);
  }

  // @Get()
  // findAll(): Observable<FeedPost[]> {
  //   return this.feedService.findAllFeeds();
  // }

  @Get()
  findSelected(
    @Query('take') take = 10,
    @Query('skip') skip = 0,
  ): Observable<Feed[]> {
    take = take > 20 ? 20 : take;
    return this.feedService.findFeeds(take, skip);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() post: Feed,
  ): Observable<UpdateResult> {
    return this.feedService.updateFeed(id, post);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deleteFeed(id);
  }
}
