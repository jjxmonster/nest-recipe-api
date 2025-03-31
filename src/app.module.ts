import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RecipeModule } from './recipe/recipe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { databaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/envValidationSchema.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      validationSchema: envValidationSchema,
    }),
    RecipeModule,
    TypeOrmModule.forRootAsync(databaseConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
