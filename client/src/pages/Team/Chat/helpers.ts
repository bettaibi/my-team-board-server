

export function isMemberConnected(memberId: string, users: any ): boolean {

    return users.hasOwnProperty(memberId) && !users[memberId].lastSeen;
}

export async function getSocketId(memberId: string, users: any): Promise<string>{
    if(users.hasOwnProperty(memberId)){
       return users[memberId].socketId;
    }
    else return '';
}