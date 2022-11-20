import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NewsTypes } from '../enums/news-types.enum';
import { NewsDataModel } from './news.model';
import { NormalNewsData } from './create-normal-news.dto';
import { SlideshowNewsData } from './create-slideshow-news.dto';

export class CreateNewsDto {
  @ValidateNested()
  @Type(() => NewsDataModel,
    {
      keepDiscriminatorProperty: true,
      discriminator: {
        property: 'type',
        subTypes: [
          { value: NormalNewsData, name: NewsTypes.NORMAL },
          { value: SlideshowNewsData, name: NewsTypes.SLIDESHOW }
        ]
      }
    }
  )
  @IsDefined()
  data: NewsDataModel;
}

