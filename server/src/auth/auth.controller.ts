import { Controller, Post, Body, Get, Res, Req, Render, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto, ResetPasswordDto } from './auth.dto';
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
    async login(@Body()payload: LoginDto, @Res() response: Response): Promise<any>{
        try{
            const jwt = await this.authService.login(payload);
            response.cookie('jwt', jwt, {maxAge: 6.048e+8});
            response.json({success: true, message: 'Welcome back'});
        }
        catch(err){
            throw err;
        }
    }

    @Post('/register')
    async register(@Body()payload: RegisterDto, @Res({passthrough: true}) response: Response): Promise<any>{
        try{
            const jwt = await this.authService.register(payload);
            response.cookie('jwt', jwt, {maxAge: 6.048e+8});
            return toJson(true, 'Welcome back');
        }
        catch(err){
            throw err;
        }
    }

    @Get('/user')
    async currentUser(@Req() req: Request): Promise<any>{
       try{
            const token = req.cookies['jwt'];
            console.log(token);
            return await this.authService.currentUser(token);
       }
       catch(err){
           throw err;
       }
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

    @Get('/resetPassword')
    @Render('reset-password')
    async getResetPage(@Query('email') email: string): Promise<any>{
        try{
            return { error: false, success: false, userEmail: email};
        }
        catch(err){
            throw err;
        }
    }

    @Post('/resetPassword')
    async confirmResetPassword(@Body() payload: ResetPasswordDto, @Res() res: Response): Promise<any> {
        try{
            console.log(payload);
            if(payload.password.length < 6){
                res.render('reset-password', { error: true, success: false, userEmail: payload.email, errorMessage: 'The Password must be at least 8 characters long.' })
            }
            else{
                res.render('reset-password', { error: false, success: true, userEmail: payload.email });
            }
        }
        catch(err){
            throw err;
        }
    }

    @Post('/resetPassword')
    async resetPassword(@Body() email:string): Promise<any> {
        try{
            // Send reset link
        }
        catch(err){
            throw err;
        }
    }

}