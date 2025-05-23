import { User } from 'src/user/user.entity';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

export default class UserFactory {
  constructor(private dataSource: DataSource) {}

  make(): User {
    const user = new User();
    user.username = faker.person.fullName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    return user;
  }

  makeMany(count: number): User[] {
    return Array.from({ length: count }, () => this.make());
  }

  async create(): Promise<User> {
    const user = this.make();
    return (await this.dataSource.getRepository('User').save(user)) as User;
  }

  async createMany(count: number): Promise<User[]> {
    const users = this.makeMany(count);
    return (await this.dataSource.getRepository('User').save(users)) as User[];
  }
}
