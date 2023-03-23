import { Body, Controller, Get, Post, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { CreateUserDto } from "../users/dto";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";
import { JwtGuard } from "../auth/guard";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @ApiCreatedResponse({
    description: "Tạo tài khoản thành công",
    type: AuthDto,
  })
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @ApiOkResponse({
    description: "Đăng nhập",
    type: AuthDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Get("me")
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  getMe(@GetUser() user: User) {
    return user;
  }
}
