import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleDto } from 'src/dto/article.dto';
import { CommentDto } from 'src/dto/comment.dto';
import { BlogService } from './blog.service';
import { ArticleEntity } from './entities/article.entity';
import { CommentEntity } from './entities/comment.entity';

@Controller('blog/article')
export class BlogController {
  context = 'BlogController';

  constructor(private readonly service: BlogService) {}
  @Get('get')
  async getAll(): Promise<ArticleEntity[]> {
    Logger.log('get all articles ', this.context);
    const articles = await this.service.getArticles();
    if (articles) return articles;
    throw new HttpException('Articles not found', HttpStatus.NOT_FOUND);
  }

  @Get('get/:articleId')
  async getOne(@Param('articleId') id: string): Promise<ArticleEntity> {
    Logger.log('get one article ', this.context);
    const article = await this.service.getArticle(id);
    if (article) return article;
    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  }

  @Post('add')
  async create(@Body() articleDto: ArticleDto): Promise<ArticleEntity> {
    Logger.log('create article ', this.context);
    const article = await this.service.createArticle(articleDto);
    if (article) return article;
    throw new HttpException('Article not created', HttpStatus.NOT_MODIFIED);
  }

  @Put('update/:articleId')
  async update(
    @Param('articleId') id: string,
    @Body() articleDto: ArticleDto,
  ): Promise<ArticleEntity> {
    Logger.log('update article ', this.context);
    const article = await this.service.updateArticle(id, articleDto);
    if (article) return article;
    throw new HttpException('Article not updated', HttpStatus.NOT_MODIFIED);
  }

  @Delete('delete/:articleId')
  async delete(@Param('articleId') id: string): Promise<ArticleEntity> {
    Logger.log('delete article ', this.context);
    const article = await this.service.removeArticle(id);
    if (article) return article;
    throw new HttpException('Article not deleted', HttpStatus.NOT_FOUND);
  }

  @Post('comment/add/:articleId')
  async addComment(
    @Param('articleId') id: string,
    @Body() commentDto: CommentDto,
  ): Promise<CommentEntity> {
    const comment = await this.service.addComment(id, commentDto);
    if (comment) return comment;
    throw new HttpException('Comment not added', HttpStatus.NOT_MODIFIED);
  }
}
