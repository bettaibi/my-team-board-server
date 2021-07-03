import { ApiProperty } from '@nestjs/swagger';

export class MemberDto{
    @ApiProperty()
    name: string;
    @ApiProperty()
    title: string;
}

export interface MemberProps{
    name: string;
    title: string;
}