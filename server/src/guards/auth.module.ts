import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: 'bettaibi',
            signOptions: {expiresIn: "7d"}
        })
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    exports: [JwtModule]
})
export class AuthGuardModule {};