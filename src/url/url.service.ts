import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url, UrlDocument } from './schemas/url.schema';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async shorten(originalUrl: string, customCode?: string) {
    const shortCode = customCode || nanoid(7);
    
    const existing = await this.urlModel.findOne({ shortCode });
    if (existing) throw new ConflictException('Short code already exists');

    const newUrl = await this.urlModel.create({ originalUrl, shortCode });
    return {
      originalUrl: newUrl.originalUrl,
      shortUrl: `${process.env.BASE_URL}/r/${newUrl.shortCode}`,
    };
  }

  async redirect(shortCode: string) {
    const url = await this.urlModel.findOne({ shortCode });
    if (!url) throw new NotFoundException('Short code not found');

    url.clicks++;
    await url.save();
    return url.originalUrl;
  }

  async getStats(shortCode: string) {
    const url = await this.urlModel.findOne({ shortCode });
    if (!url) throw new NotFoundException('Short code not found');

    return {
      originalUrl: url.originalUrl,
      shortUrl: `${process.env.BASE_URL}/r/${url.shortCode}`,
      clicks: url.clicks,
    };
  }
}
