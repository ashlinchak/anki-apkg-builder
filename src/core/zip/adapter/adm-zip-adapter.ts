import * as AdmZip from 'adm-zip';
import { IZipService } from '../zip-service';

export class AdmZipAdapter implements IZipService {
  private readonly zip: AdmZip;

  constructor() {
    this.zip = new AdmZip();
  }

  addData(path: string, data: Buffer): Promise<void> {
    this.zip.addFile(path, data);
    return Promise.resolve();
  }

  save(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.zip.writeZip(path, (error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }
}
