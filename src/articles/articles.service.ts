import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {Article} from "./article";
import {ArticleDto} from "./article.dto";
import {LoggerService} from "../logger/logger.service";

@Injectable()
export class ArticlesService {
  constructor(private readonly loggerService: LoggerService) {}

  private articles: Article[] = [];
  private nextCreatedArticleId = 1;

  getAll() {
    this.loggerService.log("Getting a list of all articles.")
    return this.articles;
  }

  getById(id: number) {
    this.loggerService.log(`Getting article with id ${id}.`)

    const article = this.articles.find(article => article.id === id);

    if(!article) {
      this.loggerService.warn("Trying to access article that doesn't exist.")
      throw new NotFoundException();
    }

    return article;
  }

  create(article: ArticleDto) {
    this.loggerService.log(`Creating new article.`)
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
    this.loggerService.log(`Updating article with id ${id}.`)
    const articleIndex = this.articles.findIndex(
      (article) => article.id === id,
    );

    if(articleIndex === -1) {
      this.loggerService.warn("Trying to update article that doesn't exist.")
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
    this.loggerService.log(`Deleting article with id ${id}.`)
    const articleIndex = this.articles.findIndex(
      (article) => article.id === id,
    );

    if(articleIndex === -1) {
      this.loggerService.warn("Trying to delete article that doesn't exist.")
      throw new NotFoundException();
    }

    this.articles.splice(articleIndex, 1);
  }
}