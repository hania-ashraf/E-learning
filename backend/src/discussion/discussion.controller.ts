import { Controller, Post,Param, Body } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { ThreadsDto } from './dto/threads.dto';

@Controller('discussion')
export class DiscussionController {
    constructor(private readonly discussionService: DiscussionService){}

    //Create a thread 
    @Post('/threads')
    async createThread(@Body() threadsDto: ThreadsDto){
        const Thread = await this.discussionService.createThread( threadsDto);
        return {message:'thread Created Successfully', data: Thread};
    }

    //create Replies

    // @Post('/:threadId')
    // createReply(@Param('threadId') threadId:string, @Body() replyDto:ThreadsDto){
    //     const Reply = this.discussionService.createReply(threadId,)
    // }
}
