import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileUploadController } from './file-upload.controller';
import { UPLOAD_DIRECTORY } from './constants';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: UPLOAD_DIRECTORY,
      serveRoot: '/api/uploads',
    }),
  ],
  controllers: [FileUploadController],
  providers: [],
  exports: [],
})
export class ApiFileUploadModule {}
