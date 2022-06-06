import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { CommentEntity } from './comment.entity';

@Entity('article')
export class ArticleEntity {
  // constructor() {}

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  publised: boolean;

  @Column({ type: 'int', default: 0 })
  likeNumber: number;

  @OneToMany((type) => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];

  setTitle(title: string): void {
    this.title = title;
  }

  setContent(content: string): void {
    this.content = content;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
