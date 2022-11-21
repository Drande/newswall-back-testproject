import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './entities/news.entity';
import { NormalNewSchema } from './entities/news-normal.entity';
import { SlideshowNewSchema } from './entities/news-slideshow.entity';
import { NewsTypes } from './enums/news-types.enum';
import { UsersModule } from 'src/users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports:[
    UsersModule,
    NotificationsModule,
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
