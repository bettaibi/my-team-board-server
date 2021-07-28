import { ApiProperty } from "@nestjs/swagger";

export class WorkspaceDto{
    @ApiProperty()
    name: string;

    @ApiProperty()
    owner?: string;

    @ApiProperty()
    members?: string[];
};