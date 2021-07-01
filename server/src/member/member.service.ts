import { Injectable } from '@nestjs/common';
import { toJson } from 'src/helpers';

@Injectable()
export class MemberService {

    async list(): Promise<any> {
       try{
        return toJson(true, 'kdkdkdkd', []);
       }
       catch(err){
           throw err;
       }
    };

}