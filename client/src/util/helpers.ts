import axios from 'axios';

export function isMemberConnected(memberId: string, users: any ): boolean {

    return users.hasOwnProperty(memberId) && !users[memberId].lastSeen;
}

export async function getSocketId(memberId: string, users: any): Promise<string> {
    if(users.hasOwnProperty(memberId)){
       return users[memberId].socketId;
    }
    else return '';
}

export const fetchBoard = async (projectId: string) => {
    try{
        const {data} = await axios.get(`/aspects/${projectId}`);
        if(data.success) {
            return data.data;
        }
        else return undefined;
    }
    catch(err){
        console.error(err);
    }
};