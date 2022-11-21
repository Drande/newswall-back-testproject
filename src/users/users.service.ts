import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

  mockUsers = [
    { name: "Jorge", email: "jorgejgdrj41@gmail.com", subscribed: true, role: 'user' },
    { name: "Someone", email: "someoneEmail@domain", subscribed: false, role: 'user' }
    //TODO: Add more users
  ];

  getUsersEmails() {
    return this.mockUsers.filter(user => (user.subscribed === true || user.role === 'admin')).map(user => user.email);
  }
}
