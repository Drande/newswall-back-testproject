import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel( News.name )
    private readonly newsModel: Model<News>
  ) { }

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    try {
      const createdNew = await this.newsModel.create(createNewsDto.data);
      return createdNew;
    } catch(error) {
      if(error.errors && Object.values(error.errors).length > 0) {
        const errorMessage = Object.values(error.errors)
        .map((err:any) => err.properties.message);
        throw new BadRequestException(errorMessage);
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<News[]> {
    return this.newsModel.find({}).sort({ createdAt: -1 });
  }
}
