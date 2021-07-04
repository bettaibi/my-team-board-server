import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from 'src/models/member.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(Member.name) private readonly MemberModel: Model<MemberDocument>
    ){}

    async login(payload: LoginDto): Promise<any>{
        try{

        }
        catch(err){
            throw err;
        }
    }

    async register(payload: RegisterDto): Promise<any>{
        try{
            
        }
        catch(err){
            throw err;
        }
    }

    async forgotPassword(): Promise<any>{
        try{

        }
        catch(err){
            throw err;
        }
    }
}