import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/team_board', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }),
    ]
})
export class DatabaseModule { };