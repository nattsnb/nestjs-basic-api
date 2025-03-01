import {Injectable, NotFoundException} from "@nestjs/common";
import {Article} from "./article";
import {ArticleDto} from "./article.dto";

@Injectable()
export class ArticlesService {
  private articles: Article[] = [];
  private nextCreatedArticleId = 1;

  getAll() {
    return this.articles;
  }

  getById(id: number) {
    const article = this.articles.find(article => article.id === id);

    if(!article) {
      throw new NotFoundException();
    }

    return article;
  }

  create(article: ArticleDto) {
    if(article) {
      const newArticle = {
        id: this.nextCreatedArticleId++,
        ...article,
      }
      this.articles.push(newArticle);
      return newArticle;
    }
  }

  update(id: number, article: ArticleDto) {
    const articleIndex = this.articles.findIndex(
      (article) => article.id === id,
    );

    if(articleIndex === -1) {
      throw new NotFoundException();
    }

    this.articles[articleIndex] = {
      ...this.articles[articleIndex],
      title: article.title,
      content: article.content,
    }

    return this.articles[articleIndex]
  }

  delete(id: number) {
    const articleIndex = this.articles.findIndex(
      (article) => article.id === id,
    );

    if(articleIndex === -1) {
      throw new NotFoundException();
    }

    this.articles.splice(articleIndex, 1);
  }
}