import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ThreadsDto } from './dto/threads.dto';
import {Thread} from '../models/threads.Schema'


@Injectable()
export class DiscussionService {
  

    constructor(@InjectModel(Thread.name) private threadModel: mongoose.Model<Thread>){}

    async createThread(threadsDto: ThreadsDto){
        console.log(threadsDto);

        const newThread=  new this.threadModel(threadsDto);
        console.log(newThread);

        const saved=  await newThread.save();

       // this.Logger.log(`Thread created: ${saved.title} by ${saved.createdBy}`);

        return saved
        
    }
}
