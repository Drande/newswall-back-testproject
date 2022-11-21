import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsTypes } from './enums/news-types.enum';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel( News.name )
    private readonly newsModel: Model<News>,
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
  ) { }

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    try {
      const createdNew: News = await this.newsModel.create(createNewsDto.data);
      let emailBody: string;
      //We have the url of the images they are not stored in our backend so this example simply put the image url in an html template
      switch(createdNew.type) {
        case NewsTypes.NORMAL:
            emailBody = `
            <h1>${createdNew.title}</h1>
            <p>${createdNew.text}</p>
            <img src=${createdNew.imageUrl}>
            `;
          break;
        case NewsTypes.SLIDESHOW:
          emailBody = `
            <h1>${createdNew.title}</h1>
            <p>${createdNew.text}</p>
            ${
              createdNew.slides.map(slide => {
                return `
                <h3>${slide.title}</h3>
                <img src=${slide.imageUrl}>
                `
              }).join("")
            }
            `;
          break;
      }
      //Get the email list from the users services which returns subscribers and admins emails
      const emailList = this.usersService.getUsersEmails();
      //Send the email template using the notifications service
      this.notificationsService.notifyByEmail(emailList, emailBody);
      //This example assumes the same template is used for both subscribers and admins
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
