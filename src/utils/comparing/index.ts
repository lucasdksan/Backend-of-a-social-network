import db from '../../database/connection';

async function Compare(name: string, object: string, id: string){
    const DatabaseObject = await db(name).where(object, id).first();
    if(DatabaseObject){
        return true
    } else{
        return false;
    }
}

export default Compare;