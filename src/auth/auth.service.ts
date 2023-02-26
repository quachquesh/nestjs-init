import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(data: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data,
      });
      delete user.password;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Tên tài khoản đã tồn tại");
        }
      }
      throw error;
    }
  }

  signin(data: AuthDto) {
    return { message: "signin" };
  }
}
