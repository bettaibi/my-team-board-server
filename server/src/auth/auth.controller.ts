import { Controller, Post, Body, Get, Res, Render, Query, UseGuards, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto, ResetPasswordDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { toJson } from 'src/helpers';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/http_Exception/httpException.filter';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController{

    constructor(
        private authService: AuthService
    ){}

    @Post('/login')
    @UseFilters(new HttpExceptionFilter())
    async login(@Body()payload: LoginDto, @Res() response: Response): Promise<any>{
        try{
            const jwt = await this.authService.login(payload);
            const expiredAt = 6.048e+8;
            response.cookie('jwt', jwt, {maxAge: expiredAt, sameSite: 'none', secure: true, domain: 'my-team-board.herokuapp.com', httpOnly: true});
            return response.json({success: true, message: 'Welcome back', expiredAt});
        }
        catch(err){
            throw err;
        }
    }

    @Post('/register')
    async register(@Body()payload: RegisterDto, @Res({passthrough: true}) response: Response): Promise<any>{
        try{
            const jwt = await this.authService.register(payload);
            const expiredAt = 6.048e+8;
            response.cookie('jwt', jwt, {maxAge: expiredAt, sameSite: 'none', secure: true, domain: 'my-team-board.herokuapp.com', httpOnly: true});
            return response.json({success: true, message: 'Welcome, you have been successfully registred', expiredAt});
        }
        catch(err){
            throw err;
        }
    }

    @UseGuards(AuthGuard)
    @Get('/user')
    async currentUser(@User() userId: string): Promise<any>{
       try{
            return await this.authService.currentUser(userId);
       }
       catch(err){
           throw err;
       }
    }

    @Post('/logout')
    async logout(@Res({passthrough: true}) response: Response): Promise<any>{
        try{
            response.clearCookie('jwt', {sameSite: 'none', secure: true});
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
            return await this.authService.forgotPassword(res, payload);
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