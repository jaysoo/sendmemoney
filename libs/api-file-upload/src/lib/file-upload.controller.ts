import {
  Controller,
  UseInterceptors,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs-extra';
import * as path from 'path';
import { UPLOAD_DIRECTORY } from './constants';

fs.mkdirpSync(UPLOAD_DIRECTORY);

@Controller('file-upload')
export class FileUploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return new Promise<{ url: string }>((resolve) => {
      const stream = fs.createWriteStream(
        path.join(UPLOAD_DIRECTORY, file.originalname)
      );

      stream.once('open', function () {
        stream.write(file.buffer);
        stream.end();
        resolve({
          url: `/api/uploads/${file.originalname}`,
        });
      });
    });
  }
}
