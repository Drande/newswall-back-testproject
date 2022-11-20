import { IsString, MinLength } from "class-validator";
import { NewsDataModel } from "./news.model";

export class NormalNewsData extends NewsDataModel {
  @IsString()
  @MinLength(1)
  imageUrl: string;
}

