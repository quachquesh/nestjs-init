import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @ApiProperty({
    required: true,
    description: "Tên tài khoản",
  })
  @IsString()
  @IsNotEmpty({ message: "Tên tài khoản là bắt buộc" })
  username: string;

  @ApiProperty({
    required: true,
    description: "Mật khẩu",
  })
  @IsString()
  @IsNotEmpty({ message: "Mật khẩu là bắt buộc" })
  password: string;
}
