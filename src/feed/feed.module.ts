import { Module } from '@nestjs/common';
import { FeedService } from './services/feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedController } from './controllers/feed.controller';
import { FeedEntity } from './models/feed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedEntity])],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
