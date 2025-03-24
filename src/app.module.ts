import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RecipeModule } from './recipe/recipe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [RecipeModule, TypeOrmModule.forRoot(databaseConfig), UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
