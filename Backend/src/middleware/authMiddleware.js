const { ObjectId } = require('mongodb');
const usuarioModel = require('../model/usuarioModal');  // Certifique-se de que o caminho está correto
const tokenUtil = require('../util/token');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    console.log("Token recebido no middleware:", token);

    if (!token) {
      return res.status(401).send({ message: 'Token não fornecido' });
    }

    // Extrair o ID do usuário do token
    const decodedToken = await tokenUtil.returnIdUser(token);
    console.log("ID de usuário decodificado:", decodedToken);

    if (!decodedToken) {
      return res.status(401).send({ message: 'Token inválido' });
    }

    // Converter `idUser` para `ObjectId`
    const idUser = new ObjectId(decodedToken);  // Certifique-se de que `decodedToken` é uma string de 24 caracteres

    const usuario = await usuarioModel.buscarUsuario(idUser);

    if (!usuario) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    // Adiciona o usuário à requisição para que outras rotas possam acessá-lo
    req.usuario = usuario;
    next();
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error);
    return res.status(500).send({ message: 'Erro no servidor', error });
  }
};

module.exports = authMiddleware;
