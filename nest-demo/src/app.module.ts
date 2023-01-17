import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UserModule, ListModule, ConfigModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
