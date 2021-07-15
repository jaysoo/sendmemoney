import * as path from 'path';

export const UPLOAD_DIRECTORY = path.join(
  process.cwd(),
  process.env.NX_UPLOAD_DIRECTORY
);
