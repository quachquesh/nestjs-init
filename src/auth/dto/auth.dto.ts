import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @IsString()
  @IsNotEmpty({ message: "Tên tài khoản là bắt buộc" })
  username: string;

  @IsString()
  @IsNotEmpty({ message: "Mật khẩu là bắt buộc" })
  password: string;
}
