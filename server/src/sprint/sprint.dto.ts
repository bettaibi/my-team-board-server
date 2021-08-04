import { ApiProperty } from '@nestjs/swagger';
import { TaskModel } from 'src/models/sprint.model';

export class SprintDto{
    @ApiProperty()
    title?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    dueDate?: Date;

    @ApiProperty()
    tasks?: TaskModel[];

    @ApiProperty()
    aspect?: string;
}