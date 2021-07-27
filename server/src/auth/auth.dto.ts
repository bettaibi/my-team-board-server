import { ApiProperty } from "@nestjs/swagger";

export class LoginDto{
    @ApiProperty()
    email:string;

    @ApiProperty()
    password:string;
}

export class RegisterDto{
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class ResetPasswordDto{
    @ApiProperty()
    email:string;

    @ApiProperty()
    password:string;
}