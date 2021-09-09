import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://nidhal:bettaibinidhal123@cluster0.yjows.mongodb.net/myBoard?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }),
    ]
})
export class DatabaseModule { };