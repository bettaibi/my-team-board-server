import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController{

    constructor(
        private authService: AuthService
    ){}

    @Post('/login')
    async login(@Body()payload: LoginDto): Promise<any>{
        try{
            return this.authService.login(payload)
        }
        catch(err){
            throw err;
        }
    }

    @Post('/register')
    async register(@Body()payload: RegisterDto): Promise<any>{
        try{
            return this.authService.register(payload);
        }
        catch(err){
            throw err;
        }
    }
}