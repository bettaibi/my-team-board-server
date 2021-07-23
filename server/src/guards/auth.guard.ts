import { 
    CanActivate, 
    ExecutionContext, 
    Injectable, 
    UnauthorizedException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = req.cookies['jwt'];
        if(!token){
            throw new UnauthorizedException();
        }
        const data = await this.jwtService.verifyAsync(token);
        
        if(!data){
            throw new UnauthorizedException();
        }
        req.userID = data.id;

        return true;
    }

}