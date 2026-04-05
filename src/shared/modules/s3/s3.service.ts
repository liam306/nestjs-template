import { ConfigService } from '@/shared/modules/config/config.service';
import {
  DeleteObjectCommand,
  ObjectCannedACL,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;
  private readonly customDomain?: string;

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.config;
    this.region = config.get('AWS_S3_REGION')!;
    this.bucketName = config.get('AWS_S3_BUCKET_NAME')!;
    this.customDomain = config.get('AWS_S3_CUSTOM_DOMAIN');

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: config.get('AWS_S3_ACCESS_KEY_ID')!,
        secretAccessKey: config.get('AWS_S3_SECRET_ACCESS_KEY')!,
      },
    });
  }

  /**
   * Generates the public URL for an S3 object.
   */
  private getFileUrl(key: string): string {
    if (this.customDomain) {
      return `https://${this.customDomain}/${key}`;
    }
    return `https://s3.${this.region}.amazonaws.com/${this.bucketName}/${key}`;
  }

  /**
   * Uploads a file to AWS S3.
   * @param file - The file to upload (Express Multer object)
   * @param folder - Optional folder name to store the file
   * @returns The S3 key and URL of the uploaded file
   */
  async uploadFile(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<{ key: string; url: string }> {
    const timestamp = Date.now();
    const fileExtension = path.extname(file.originalname);
    const fileNameWithoutExt = path
      .parse(file.originalname)
      .name.replace(/\s+/g, '-');
    const keyName = `${fileNameWithoutExt}-${timestamp}${fileExtension}`;
    const key = folder ? `${folder}/${keyName}` : keyName;

    try {
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read' as ObjectCannedACL,
        },
      });

      await upload.done();

      const url = this.getFileUrl(key);

      this.logger.log(`File uploaded successfully to S3: ${key}`);

      return { key, url };
    } catch (error) {
      this.logger.error(`Failed to upload file to S3: ${key}`, error);
      throw error;
    }
  }

  /**
   * Uploads a raw buffer to AWS S3.
   * Used for processed images (e.g., after sharp resize/convert).
   */
  async uploadBuffer(
    buffer: Buffer,
    key: string,
    contentType: string,
  ): Promise<{ key: string; url: string }> {
    try {
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName,
          Key: key,
          Body: buffer,
          ContentType: contentType,
          ACL: 'public-read' as ObjectCannedACL,
        },
      });

      await upload.done();

      const url = this.getFileUrl(key);

      this.logger.log(`Buffer uploaded successfully to S3: ${key}`);

      return { key, url };
    } catch (error) {
      this.logger.error(`Failed to upload buffer to S3: ${key}`, error);
      throw error;
    }
  }

  /**
   * Deletes a file from AWS S3.
   * @param key - The key of the file to delete
   */
  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      this.logger.log(`File deleted successfully from S3: ${key}`);
    } catch (error) {
      this.logger.error(`Failed to delete file from S3: ${key}`, error);
      throw error;
    }
  }
}
