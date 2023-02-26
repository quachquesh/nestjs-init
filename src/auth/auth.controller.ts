import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @ApiCreatedResponse({
    description: "Tạo tài khoản thành công",
    type: CreateUserDto,
  })
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @ApiOkResponse({
    description: "Đăng nhập",
    type: AuthDto,
  })
  @Post("signin")
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
