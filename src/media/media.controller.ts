import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ForbiddenException,
} from "@nestjs/common";
import { MediaService } from "./media.service";
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { uploadImageOptions } from "../common/configs";
import * as fs from "fs";

@Controller({
  path: "media",
  version: "1",
})
@ApiTags("Media v1")
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file", uploadImageOptions))
  @ApiBody({
    schema: {
      required: ["file"],
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  async create(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log("file", file);
    console.log("file path", file.path);
    return this.mediaService.create(file);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.mediaService.findOne(+id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      const file = await this.mediaService.findOne(+id);
      await fs.unlinkSync(file.path);
    } catch {}
    return this.mediaService.remove(+id);
  }
}
