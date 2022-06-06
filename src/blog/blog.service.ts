import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { ArticleDto } from 'src/dto/article.dto';
import { CommentDto } from 'src/dto/comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  getArticles() {
    return this.articleRepository.find(/*{ relations: ['comments'] }*/);
  }

  async getArticle(id: string): Promise<ArticleEntity | null> {
    const artilce = this.articleRepository.findOne(id);
    if (artilce) return artilce;
    return null;
  }

  async createArticle(articleDto: ArticleDto): Promise<ArticleEntity> {
    const article = await this.articleRepository.save(articleDto);
    return article;
  }

  async updateArticle(
    id: string,
    articleDto: ArticleDto,
  ): Promise<ArticleEntity | null> {
    let article = await this.articleRepository.findOne(id);
    if (!article) return null;
    articleDto.updatedAt = new Date();
    await this.articleRepository.update(id, articleDto);
    article = await this.articleRepository.findOne(id);
    return article;
  }

  async removeArticle(id: string): Promise<ArticleEntity | null> {
    const article = await this.articleRepository.findOne(id);
    if (!article) return null;
    await this.articleRepository.remove(article);
    return article;
  }

  async addComment(
    id: string,
    commentDto: CommentDto,
  ): Promise<CommentEntity | null> {
    const article = await this.articleRepository.findOne(id, {
      relations: ['comments'],
    });
    if (!article) return null;
    let comment = new CommentEntity();
    comment.message = commentDto.message;
    comment.article = article;
    comment = await this.commentRepository.save(comment);
    return comment;
  }
}
