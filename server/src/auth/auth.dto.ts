import { ApiProperty } from "@nestjs/swagger";

export class LoginDto{
    @ApiProperty()
    email:string;

    @ApiProperty()
    password:string;
}

export class RegisterDto{
    @ApiProperty()
    workspace:string;

    @ApiProperty()
    email:string;

    @ApiProperty()
    password:string;
}