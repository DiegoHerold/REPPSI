const token = require("../util/token");
const usuarioModel = require("../model/usuarioModal");
const md5 = require('md5');

exports.entrar = async (nome, email, senha) => {
  let resp = await usuarioModel.registrarUsuario(nome, email, senha);
  console.log("resposta do registro entrar: " + resp);

  if (resp.insertedId) {
      // Gere o token JWT sem usar a senha diretamente
      const idUser = JSON.stringify(resp.insertedId).replace(/"/g, '');
      const tokenJwt = await token.setToken(idUser,nome); // Se `setToken` cria um token JWT adequadamente
      console.log("token: "+tokenJwt);
      return {
          "idUser": resp.insertedId,
          "token": tokenJwt,  // Envia o JWT corretamente
          "email": email,
          "senha": md5(senha) // Idealmente, mude para um hash mais seguro como bcrypt
      };
  }
};

exports.sairChat = async (nick) => {
    let user = await usuarioModel.buscarUsuario(nick);
    if (user) {
      let resp = await usuarioModel.excluirUsuario(user._id);
      if (resp.deletedCount) {
        return {msg:'Ok, saiu do chat', timestamp:timestamp=Date.now()};
      }
    }
    return false;
  
  };
