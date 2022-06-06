import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [BlogModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
