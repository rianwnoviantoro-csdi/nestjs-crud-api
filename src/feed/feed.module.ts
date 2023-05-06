import { Module } from '@nestjs/common';
import { FeedService } from './services/feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedController } from './controllers/feed.controller';
import { FeedEntity } from './models/feed.entity';
import { AuthModule } from 'src/auth/auth.module';
import { IsCreatorGuard } from './guards/is-creator.guard';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([FeedEntity])],
  providers: [FeedService, IsCreatorGuard],
  controllers: [FeedController],
})
export class FeedModule {}
