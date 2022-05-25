import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('blog')
export class BlogController {
  context = 'BlogCOntroller';
  @Get()
  getAll() {
    Logger.log('get all articles ', this.context);
    return [];
  }

  @Get(':articleId')
  getOne(@Param('articleId') id) {
    Logger.log('get one article ', this.context);
    return id;
  }

  @Post()
  create(@Body() articleDto) {
    Logger.log('create article ', this.context);
    return 'created article';
  }

  @Put(':articleId')
  update(@Param('articleId') articleId, @Body() articleDto) {
    Logger.log('update article ', this.context);
    return 'updated article';
  }

  @Delete(':articleId')
  delete(@Param('articleId') articleId) {
    Logger.log('delete article ', this.context);
    return 'deleted article';
  }
}
