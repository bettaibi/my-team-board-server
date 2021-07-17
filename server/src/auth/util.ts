import {genSalt, hash, compare} from 'bcrypt';

const onCrypt = async (password: string): Promise<string> => {
    try{
        const salt = await genSalt(10);
        const hashed = await hash(password, salt);
        return hashed;
    }
    catch(err){
        throw err;
    }
};

const onCompare = async (candidatePassword: string, hash: string): Promise<boolean> => {
    try{
        const isMatch = await compare(candidatePassword, hash);
        return isMatch;
    }
    catch(err){
        throw err;
    }
};

export { onCrypt, onCompare };


