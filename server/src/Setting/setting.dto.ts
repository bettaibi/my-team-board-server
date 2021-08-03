import { ApiProperty } from '@nestjs/swagger';

export class MemberEmailDto{
    @ApiProperty()
    email?: string;

    @ApiProperty()
    newEmail?: string;

    @ApiProperty()
    password?: string;
    
}