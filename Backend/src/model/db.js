const {MongoClient, ObjectId} = require("mongodb"); 

let singleton;

async function connect(){
    if(singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    console.log("conectou com banco")
    return singleton;

}

async function findAll(collection){
    const db = await connect();
    return await db.collection(collection).find().toArray();
   
}

async function insertOne(collection, objeto){
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}
async function findOne(collection, query) {
    const db = await connect();
    
    // Se o campo _id existir no query e ele for uma string, converta para ObjectId
    if (query._id && typeof query._id === 'string') {
      query._id = new ObjectId(query._id);
    }
  
    let obj = await db.collection(collection).find(query).toArray();
    if (obj.length > 0) {
      return obj[0];
    }
    return false;
  }
  async function findOneEmail(collection, email) {
    console.log("entrou em findOneEmail");
    console.log("Buscando pelo email:", email);  // Log do email que está sendo buscado
  
    const db = await connect();
    let obj = await db.collection(collection).find({ email: email }).toArray();
    console.log("Resultado da busca:", obj);  // Log do resultado da busca
  
    if (obj && obj.length > 0) {
      console.log("Usuário encontrado:", obj[0]);
      return obj[0];
    } else {
      console.log("Nenhum usuário encontrado com o email especificado");
      return false;
    }
  }

async function updateOne(collection,object,param){
    const db = await connect();
    let result = await db.collection(collection).updateOne(param,{ $set: object});
    return result;
}

let deleteOne = async (collection, _id)=>{
    const db = await connect();
    let result = await db.collection(collection).deleteOne({'_id':new ObjectId(_id)});
    console.log(result);
    return result;
}


module.exports = {findAll,connect,findOne,findOneEmail,updateOne,insertOne, deleteOne}