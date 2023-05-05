import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  createFeed(feedPost: FeedPost): Observable<FeedPost> {
    return from(this.feedPostRepository.save(feedPost));
  }

  findAllFeeds(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }

  updateFeed(id: number, feedPost: FeedPost): Observable<UpdateResult> {
    feedPost.updatedAt = new Date();
    return from(this.feedPostRepository.update(id, feedPost));
  }

  deleteFeed(id: number): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id));
  }
}
