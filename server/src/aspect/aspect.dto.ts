import { ApiProperty } from '@nestjs/swagger';

export class AspectDto{
    @ApiProperty()
    title?: string;

    @ApiProperty()
    project?: string;
    
}
