import {Injectable, NotFoundException} from "@nestjs/common";
import {Article} from "./article";
import {ArticleDto} from "./article.dto";
import {LoggerService} from "../logger/logger.service";
import {PrismaService} from "../database/prisma.service";
import {Prisma} from "@prisma/client";
import {PrismaError} from "../database/prisma-error.enum";

@Injectable()
export class ArticlesService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly prismaService: PrismaService
  ) {}

  private articles: Article[] = [];

  getAll() {
    this.loggerService.log("Getting a list of all articles.")
    return this.prismaService.article.findMany();
  }

  async getById(id: number) {
    this.loggerService.log(`Getting article with id ${id}.`)
    const article =  await this.prismaService.article.findUnique({
      where: {
        id,
      }
    })

    if(!article) {
      this.loggerService.warn("Trying to access article that doesn't exist.")
      throw new NotFoundException();
    }

    return article;
  }

  create(article: ArticleDto) {
    this.loggerService.log(`Creating new article.`)
    return this.prismaService.article.create({
      data: article
    });
  }

  async update(id: number, article: ArticleDto) {
    this.loggerService.log(`Updating article with id ${id}.`)
    try {
      return await this.prismaService.article.update({
        data: {
          ...article,
          id: undefined
        },
        where: {
          id,
        }
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new NotFoundException();
      }
      throw error;
    }
  }

  async delete(id: number) {
    this.loggerService.log(`Deleting article with id ${id}.`)
    try {
      return await this.prismaService.article.delete({
        where: {
          id,
        }
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new NotFoundException();
      }
      throw error;
    }
  }
}