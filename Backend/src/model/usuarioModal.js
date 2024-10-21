const db = require("./db");
const md5 = require('md5');
async function registrarUsuario(nome,email,senha){
    console.log("senha em md5:"+md5(senha))
    return await db.insertOne("Usuarios",{"nome": nome,"email": email,"senha":md5(senha)});
}

async function buscarUsuario(idUser){
    console.log("buscarUsuario:"+idUser)
    let user = await db.findOne("Usuarios", idUser);
    console.log("user no usuario modal: "+user);
    return user;
}

async function alterarUsuario(user){
    return await db.updateOne("Usuarios",user,{_id:user._id});
}

let excluirUsuario = async (idUser)=>{  
    return await db.deleteOne('Usuarios',idUser);   
}

module.exports = {registrarUsuario,buscarUsuario,alterarUsuario, excluirUsuario};