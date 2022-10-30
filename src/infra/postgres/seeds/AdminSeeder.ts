import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { CryptoService } from '../../../app/service/crypto.service';
import { UserType } from '../../../domain/enum/UserType';
import { ADMIN_PASSWORD } from '../../../main/config/env';
import { User } from '../schema/User.schema';

export class AdminSeeder implements Seeder {
  public async run(dataSource: DataSource, _factoryManager: SeederFactoryManager): Promise<void> {

   const user = new User();
   user.email = 'admin@perseu.com';
   user.password = await CryptoService.hash(ADMIN_PASSWORD!);
   user.type = UserType.ADMIN;
   await dataSource.manager.save(user);
  }
}