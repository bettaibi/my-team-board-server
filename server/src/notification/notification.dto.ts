import { ApiProperty } from '@nestjs/swagger';


class NotificationMemberDto {
    @ApiProperty()
    _id?: string;

    @ApiProperty()
    seen?: boolean;
}

export class NotificaionDto{
    @ApiProperty()
    title?: string;

    @ApiProperty()
    body?: string;

    @ApiProperty()
    createdAt?: Date;

    @ApiProperty()
    members?: NotificationMemberDto[]

    @ApiProperty()
    workspace?: string;
}
