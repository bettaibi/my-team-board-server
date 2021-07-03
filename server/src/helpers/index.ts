import { Types } from 'mongoose';

export const toJson = (success: boolean, message: string, data?: any) => {
    return {success, message, data};
};

export const toObjectID = (id: string): Types.ObjectId => {
    return Types.ObjectId(id);
};

