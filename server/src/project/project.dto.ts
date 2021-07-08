import { ApiProperty } from "@nestjs/swagger";


export class ProjectDto{
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    workspace: string;
}