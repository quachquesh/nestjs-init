import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: "Tạo tài khoản thành công",
    type: AuthDto,
  })
  @Post("signup")
  signup(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signup();
  }

  @Post("signin")
  signin() {
    return this.authService.signin();
  }
}
