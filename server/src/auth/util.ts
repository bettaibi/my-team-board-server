import bcrypt from 'bcrypt';


const genSalt = async (password: string): Promise<string> => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch(err){
        throw err;
    }
};

const compare = async (candidatePassword: string, hash: string): Promise<boolean> => {
    try{
        const isMatch = await bcrypt.compare(candidatePassword, hash);
        return isMatch;
    }
    catch(err){
        throw err;
    }
};

export { genSalt, compare };


