import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {ThreadSchema} from '../models/threads.Schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Thread', schema: ThreadSchema }])],
  exports: [DiscussionService],  //exporting the service so it can be used in other modules
  providers: [DiscussionService],
  controllers: [DiscussionController]
})
export class DiscussionModule {}
