import mongoose from 'mongoose';
export const listCollections = async () => {
    try {
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(collections.map((c) => c.name));
        return collections.map((c) => c.name)
    } catch (err) {
        console.error(err);
    }  
};