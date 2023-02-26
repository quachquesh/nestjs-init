import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}
  async signup(data: CreateUserDto) {
    try {
      // Tạo password hash
      const hash = await argon.hash(data.password);
      data.password = hash;
      // Lưu data user vào database
      const { password, ...user } = await this.prisma.user.create({
        data,
      });
      // Trả về user vừa tạo
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

  async signin(data: AuthDto) {
    const { password, ...user } = await this.prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (!user) {
      throw new ForbiddenException("Tên tài khoản hoặc mật khẩu không đúng");
    }
    const valid = await argon.verify(password, data.password);
    if (!valid) {
      throw new ForbiddenException("Tên tài khoản hoặc mật khẩu không đúng");
    }
    return this.signToken(user.id, user.username);
  }

  async signToken(userId: number, username: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      username,
    };

    const secret = this.config.get("JWT_SECRET");

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "7d",
      secret: secret,
    });
    return { access_token: token };
  }
}
