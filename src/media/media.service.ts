import { Injectable, ForbiddenException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}
  async create(file: Express.Multer.File) {
    try {
      const data = {
        fileName: file.originalname,
        path: file.destination + "/" + file.filename,
      };
      return await this.prisma.media.create({
        data,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("File đã tồn tại");
        }
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.media.findMany();
  }

  async findOne(id: number) {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });
    if (!media) {
      throw new NotFoundException("File không tồn tại");
    }
    return media;
  }

  async remove(id: number) {
    try {
      return await this.prisma.media.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundException("File không tồn tại");
        }
      }
      throw error;
    }
  }
}
