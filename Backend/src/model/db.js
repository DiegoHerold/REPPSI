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
async function insertOne(collection, objeto){
  const db = await connect();
  return db.collection(collection).insertOne(objeto);
}

async function findAll(collection) {
  try {
      const db = await connect();
      const result = await db.collection(collection).find().toArray();
      console.log("Dados encontrados:", result);
      return result;
  } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return [];
  }
}
async function findAllPsychologists(collection) {
  console.log("Buscando peloS PSICOLOGOS",);  

  const db = await connect();
  let obj = await db.collection(collection).find({papel:"psicologo"}).toArray();
  console.log("Resultado da busca:", obj);  

  if (obj && obj.length > 0) {
    return obj;
  } else {
    console.log("Nenhum usuário encontrado com o email especificado");
    return false;
  }
}




// async function findOne(collection, query) {
//     const db = await connect();
    
//     // Se o campo _id existir no query e ele for uma string, converta para ObjectId
//     if (query._id && typeof query._id === 'string') {
//       query._id = new ObjectId(query._id);
//     }
  
//     let obj = await db.collection(collection).find(query).toArray();
//     if (obj.length > 0) {
//       return obj[0];
//     }
//     return false;
//   }
  async function findOneEmail(collection, email) {
    console.log("Buscando pelo email:", email);  
  
    const db = await connect();
    let obj = await db.collection(collection).find({ email: email }).toArray();
    console.log("Resultado da busca:", obj);  
  
    if (obj && obj.length > 0) {
      return obj[0];
    } else {
      console.log("Nenhum usuário encontrado com o email especificado");
      return false;
    }
  }

  async function findOneId(collection, iduser) {
    console.log("Buscando pelo id", iduser);  
  
    const db = await connect();
   
    if (iduser && typeof iduser === 'string') {
      iduser = new ObjectId(iduser);
    }
    let obj = await db.collection(collection).find({ _id: iduser }).toArray();
    console.log("Resultado da busca:", obj);  
  
    if (obj && obj.length > 0) {
      return obj[0];
    } else {
      console.log("Nenhum usuário encontrado com o email especificado");
      return false;
    }
  }
  async function findOneUserId(collection, iduser) {
    console.log("Buscando pelo id", iduser);  
  
    const db = await connect();
   
    if (iduser && typeof iduser === 'string') {
      iduser = new ObjectId(iduser);
    }
    let obj = await db.collection(collection).find({ userId: iduser }).toArray();
    console.log("Resultado da busca:", obj);  
  
    if (obj && obj.length > 0) {
      return obj;
    } else {
      console.log("Nenhum usuário encontrado com o id especificado");
      return false;
    }
  }
  async function findOneIdUserAndRole( iduser, role) {
    console.log("Buscando pelo id", iduser); 
    console.log("Buscando pelo role", role);   
  
    const db = await connect();
   
    if (iduser && typeof iduser === 'string') {
      iduser = new ObjectId(iduser);
    }
    let obj = await db.collection("Usuarios").find({ _id: iduser,papel: role }).toArray();
    console.log("Resultado da busca:", obj);  
  
    if (obj && obj.length > 0) {
      return obj[0];
    } else {
      console.log("Nenhum usuário encontrado com o email especificado");
      return false;
    }
  }
async function updateOne(collection,object,param){
    const db = await connect();
    if (param && typeof param === 'string') {
      param = new ObjectId(param);
    }
    let result = await db.collection(collection).updateOne({_id:param},{ $set: object});
    return result;
}
async function updateOnePush(collection, filter, update) {
  const db = await connect();
  const result = await db.collection(collection).updateOne(filter, update);
  return result;
}

let deleteOne = async (collection, _id)=>{
    const db = await connect();
    let result = await db.collection(collection).deleteOne({'_id':new ObjectId(_id)});
    console.log(result);
    return result;
}

let deleteAlls = async (collection, _id) => {
  const db = await connect();

  // Verifica se precisa de conversão para ObjectId
  const filter = { userId: typeof _id === 'string' && _id.length === 24 ? new ObjectId(_id) : _id };
  
  const result = await db.collection(collection).deleteMany(filter);

  console.log(`Número de documentos deletados: ${result.deletedCount}`);
  return result;
};
let deleteConsultas = async (collection, _id,status) => {
  const db = await connect();

  // Verifica se precisa de conversão para ObjectId
  const filter = {
    userId: typeof _id === 'string' && _id.length === 24 ? new ObjectId(_id) : _id,
    status: status, // Filtra pelos status desejados
  };

  const result = await db.collection(collection).deleteMany(filter);

  console.log(`Número de documentos deletados: ${result.deletedCount}`);
  return result;
};


module.exports = {findAll,findAllPsychologists,connect,findOneEmail,findOneId,findOneUserId,findOneIdUserAndRole,updateOne,updateOnePush,insertOne, deleteOne,deleteAlls,deleteConsultas}