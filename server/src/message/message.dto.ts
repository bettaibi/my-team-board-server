import { ApiProperty } from "@nestjs/swagger";


export class MessageDto{
    @ApiProperty()
    text?: string;

    @ApiProperty()
    file?: string;

    @ApiProperty()
    workspace?: string;

    @ApiProperty()
    sender?: string;

    @ApiProperty()
    pictures?: string[];

    @ApiProperty()
    members?: string[];
}