import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import UserFactory from '../factories/user.factory';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userFactory = new UserFactory(dataSource);
    await userFactory.createMany(10);
  }
}
