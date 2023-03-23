import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class UpdateUserDto {
  @ApiProperty({
    required: true,
    description: "Họ",
  })
  @IsString()
  @IsNotEmpty({ message: "Họ là bắt buộc" })
  firstName: string;

  @ApiProperty({
    required: true,
    description: "Tên",
  })
  @IsString()
  @IsNotEmpty({ message: "Tên là bắt buộc" })
  lastName: string;
}
