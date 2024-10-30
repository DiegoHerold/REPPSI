const usuarioModel = require('../model/usuarioModal');  // Corrija o caminho aqui
const tokenUtil = require('../util/token');  // Suponho que você também tenha um utilitário de token

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).send({ message: 'Token não fornecido' });
    }

    // Verifica se o token é válido
    const decodedToken = tokenUtil.returnIdUser(token);  // Assumindo que você tenha uma função para verificar tokens

    if (!decodedToken) {
      return res.status(401).send({ message: 'Token inválido' });
    }

    // Buscar usuário pelo email decodificado do token
    console.log("decodedToken, o idUser: "+decodedToken)
    const idUser = decodedToken;  // Assumindo que o email esteja no token
    let usuario = await usuarioModel.buscarUsuario(idUser);  // Aqui usa o usuarioModel

    if (!usuario) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    // Adiciona o usuário à requisição para que outras rotas possam acessá-lo
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(500).send({ message: 'Erro no servidor', error });
  }
};

module.exports = authMiddleware;

