import { Controller, Post, Body, Get, Res, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { toJson } from 'src/helpers';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController{

    constructor(
        private authService: AuthService
    ){}

    @Post('/login')
    async login(@Body()payload: LoginDto, @Res({passthrough: true}) response: Response): Promise<any>{
        try{
            const jwt = await this.authService.login(payload);
            response.cookie('jwt', jwt, {httpOnly: true});
            return toJson(true, 'Welcome back');
        }
        catch(err){
            throw err;
        }
    }

    @Post('/register')
    async register(@Body()payload: RegisterDto, @Res({passthrough: true}) response: Response): Promise<any>{
        try{
            const jwt = await this.authService.register(payload);
            response.cookie('jwt', jwt, {httpOnly: true});
            return toJson(true, 'Welcome back');
        }
        catch(err){
            throw err;
        }
    }

    @Get('/user')
    async currentUser(@Req() req: Request): Promise<any>{
        const cookie = req.cookies['jwt'];

        return await this.authService.currentUser(cookie);
    }

    @Post('/logout')
    async logout(@Res({passthrough: true}) response: Response): Promise<any>{
        try{
            response.clearCookie('jwt');
            return toJson(true, 'User logged out successfully');
        }
        catch(err){
            throw err;
        }
    }
}