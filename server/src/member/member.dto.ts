import { ApiProperty } from '@nestjs/swagger';

export class MemberDto{
    @ApiProperty()
    name?: string;
    
    @ApiProperty()
    title?: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    address?: string;

    @ApiProperty()
    country?: string;

    @ApiProperty()
    city?: string;
    
    @ApiProperty()
    phone?: string;
}