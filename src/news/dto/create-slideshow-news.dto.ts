import { Type } from "class-transformer";
import { IsString, IsArray, ArrayNotEmpty, ValidateNested, MinLength } from "class-validator";
import { NewsDataModel } from "./news.model";

export class SlideshowNewsSlides {

  @IsString()
  @MinLength(1)
  imageUrl: string;

  @IsString()
  @MinLength(1)
  title: string;
}

export class SlideshowNewsData extends NewsDataModel {

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SlideshowNewsSlides)
  slides: SlideshowNewsSlides;
}
