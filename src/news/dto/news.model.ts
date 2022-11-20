import { IsString, IsArray, IsEnum } from "class-validator";
import { NewsTypes } from "../enums/news-types.enum";

export class NewsDataModel {
  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsEnum(NewsTypes, { message: (arg) => `${arg.property} must be a valid value: ${Object.values(arg.constraints[0])}`
  })
  type: NewsTypes;
}