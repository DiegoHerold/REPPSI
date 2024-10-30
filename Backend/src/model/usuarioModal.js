const db = require("./db");
const md5 = require('md5');
async function registrarUsuario(nome,email,senha){
    console.log("senha em md5:"+senha)
    return await db.insertOne("Usuarios",{'nome': nome,'email': email,'senha':senha});
}

async function buscarUsuario(idUser){
    console.log("buscarUsuario:"+idUser)
    let user = await db.findOne("Usuarios", idUser);
    console.log("user no usuario modal: "+user);
    return user;
}

// Busca um usuário por email
async function buscarUsuarioPorEmail(email) {
    console.log("buscarUsuario por email:"+email)
    let user = await db.findOneEmail("Usuarios", email);
    console.log("user no usuario modal: "+user);
    return user;
  }

// Função para hash da senha
function hashSenha(senha) {
    return md5(senha); // Retorna o hash da senha usando md5
  }

async function alterarUsuario(user){
    return await db.updateOne("Usuarios",user,{_id:user._id});
}

let excluirUsuario = async (idUser)=>{  
    return await db.deleteOne('Usuarios',idUser);   
}

module.exports = {registrarUsuario,buscarUsuario,alterarUsuario, excluirUsuario,buscarUsuarioPorEmail, hashSenha};