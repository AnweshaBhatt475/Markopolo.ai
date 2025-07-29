import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

class ShortenUrlDto {
  url: string;
  customCode?: string;
}

@ApiTags('URL')
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('/api/shorten')
  @ApiBody({ type: ShortenUrlDto })
  @ApiResponse({ status: 201, description: 'Short URL created' })
  @ApiResponse({ status: 409, description: 'Custom short code already exists' })
  async shorten(@Body() body: { url: string; customCode?: string }) {
    return this.urlService.shorten(body.url, body.customCode);
  }

  @Get('/r/:shortCode')
  @ApiParam({ name: 'shortCode', required: true })
  @ApiResponse({ status: 302, description: 'Redirects to original URL' })
  @ApiResponse({ status: 404, description: 'Short code not found' })
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const originalUrl = await this.urlService.redirect(shortCode);
    return res.redirect(302, originalUrl);
  }

  @Get('/api/stats/:shortCode')
  @ApiParam({ name: 'shortCode', required: true })
  @ApiResponse({ status: 200, description: 'Returns stats for the short URL' })
  @ApiResponse({ status: 404, description: 'Short code not found' })
  async stats(@Param('shortCode') shortCode: string) {
    return this.urlService.getStats(shortCode);
  }
}
