import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './entities/news.entity';
import { NormalNew, NormalNewSchema } from './entities/news-normal.entity';
import { SlideshowNew, SlideshowNewSchema } from './entities/news-slideshow.entity';
import { NewsTypes } from './enums/news-types.enum';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: News.name,
        schema: NewsSchema,
        discriminators: [
          { name: NewsTypes.NORMAL, schema: NormalNewSchema },
          { name: NewsTypes.SLIDESHOW, schema: SlideshowNewSchema },
        ]
      }
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
