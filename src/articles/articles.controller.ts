import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './create-article.dto';
import { UpdateArticleDto } from './update-article.dto';
import { JwtAuthenticationGuard } from '../authentication/jwt-authentication.guard';

@Controller('articles')
export class ArticlesController {
  constructor(public readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() article: CreateArticleDto) {
    return this.articlesService.create(article);
  }

  @Get()
  getAll() {
    return this.articlesService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.getById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() article: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, article);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.delete(id);
  }
}
