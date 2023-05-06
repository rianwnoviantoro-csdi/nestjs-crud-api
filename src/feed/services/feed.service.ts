import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedEntity } from '../models/feed.entity';
import { Feed } from '../models/feed.interface';
import { User } from 'src/auth/models/user.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
  ) {}

  createFeed(user: User, feedPost: Feed): Observable<Feed> {
    feedPost.author = user;
    return from(this.feedRepository.save(feedPost));
  }

  findAllFeeds(): Observable<Feed[]> {
    return from(this.feedRepository.find());
  }

  findFeeds(take = 10, skip = 0): Observable<Feed[]> {
    return from(
      this.feedRepository.findAndCount({ take, skip }).then(([posts]) => {
        return <Feed[]>posts;
      }),
    );
  }

  updateFeed(id: number, feedPost: Feed): Observable<UpdateResult> {
    feedPost.updatedAt = new Date();
    return from(this.feedRepository.update(id, feedPost));
  }

  deleteFeed(id: number): Observable<DeleteResult> {
    return from(this.feedRepository.delete(id));
  }

  findFeedById(id: number): Observable<Feed> {
    return from(
      this.feedRepository.findOne({ where: { id }, relations: ['author'] }),
    );
  }
}
