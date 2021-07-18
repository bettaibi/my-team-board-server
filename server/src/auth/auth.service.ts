import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from 'src/models/member.model';
import { Workspace, WorkspaceDocument } from 'src/models/workspace.model';
import { Model } from 'mongoose';
import { toJson, toObjectID } from 'src/helpers';
import { onCompare, onCrypt } from './util';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(Member.name) private readonly MemberModel: Model<MemberDocument>,
        @InjectModel(Workspace.name) private readonly WorkspaceModel: Model<WorkspaceDocument>
    ){}

    async login(payload: LoginDto): Promise<any>{
        try{
            const found = await this.MemberModel.findOne({email: payload.email});
            if(!found){
                throw new BadRequestException('No such Account');
                // return toJson(false, 'No such Account');
            }
            const isMatch = await onCompare(payload.password, found.password);
            if(!isMatch){
                throw new BadRequestException('Password mismatch');
                // return toJson(false, 'Password mismatch');
            }
            // Generate jwt token
            const jwt  = await this.jwtService.signAsync({id: found.id});
            return jwt;
        }
        catch(err){
            throw err;
        }
    }

    async register(payload: RegisterDto): Promise<string>{
        try{
            const found = await this.MemberModel.findOne({email: payload.email});
            if(found){
                // return toJson(false, 'Email already in use!');
                throw new BadRequestException('Email already in use!');
            }
            const hash = await onCrypt(payload.password);
            const saved = await this.MemberModel.create({...payload, password: hash});
            if(!saved){
                // return toJson(false, 'Failed to register!');
                throw new BadRequestException('Failed to register');
            }
            const workspace = await this.WorkspaceModel.create({name: payload.workspace, owner: saved.id, members: [saved.id]});
            if(!workspace){
                // return toJson(false, 'Failed to create a default workspace!');
                throw new BadRequestException('Workspace name is not available, try a new one');
            }
            const jwt  = await this.jwtService.signAsync({id: saved.id});
            return jwt;
        }
        catch(err){
            throw err;
        }
    }

    async currentUser(cookie: string): Promise<any>{
        try{
            const data = await this.jwtService.verifyAsync(cookie);
            if(!data){
                throw new UnauthorizedException();
            }
            const found = await this.MemberModel.findOne({_id: toObjectID(data.id)}, {password: 0});
            if(!found){
                throw new UnauthorizedException();
            }
            return toJson(true, 'currentUser', found);
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