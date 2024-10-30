const tokenUtil = require('../util/token');  // Certifique-se de que isso esteja correto
const usuarioModel = require('../model/usuarioModal');
const md5 = require('md5');

exports.usuarioAutenticado = async()=> {
  return localStorage.getItem("token") != undefined ? true : false
  // return typeof localStorage.getItem("token")
};

// Registrar Usuário
exports.registrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    // Registra o usuário no banco de dados
    let resp = await usuarioModel.registrarUsuario(nome, email, md5(senha));
    console.log("registrar usuario:", resp);
    
    if (resp.insertedId) {
      // Gere o token JWT após o cadastro do usuário
      const token = tokenUtil.setToken(resp.insertedId);
      return res.status(201).send({
        success: true,
        message: 'Login bem-sucedido',
        usuario: {
        nome: nome,
        email: email},
        token:token
      });
    } else {
      return res.status(400).send({ message: 'Erro ao cadastrar usuário' });
    }
  } catch (error) {
    return res.status(500).send({ message: 'Erro no servidor', error });
  }
};





// Login do Usuário
exports.loginUsuario = async (req, res) => {
  console.log("passou a rota req.body:"+ req.body.email);
  console.log("passou a rota req.body:"+ req.body.senha);
  const { email, senha } = req.body;

  // Verifica se o email e a senha foram enviados
  if (!email || !senha) {
    return res.status(400).send({ message: 'Email e senha são obrigatórios' });
  }

  try {
    // Busca o usuário pelo email
    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(401).send({ message: 'Email não cadastrado' });
    }

    // Verifica se a senha corresponde ao hash no banco de dados
    const hashedPassword = senha;  // Certifique-se de usar o mesmo método de hash
    console.log("senha do modal:"+senha);
    console.log("senha do mongodb:"+usuario.senha);

    console.log("senha do modal:"+md5(senha));
    if (usuario.senha !== md5(senha) ) {
      return res.status(401).send({ message: 'Email ou senha incorretos' });
    }

    // Cria o token do usuário
    const token = tokenUtil.setToken(usuario._id);
    console.log("Login Usuario, token gerado: " + token);

    // Retorna o usuário e o token em um objeto
    return res.status(200).send({
      success: true,
      message: 'Login bem-sucedido',
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
      token: token
    });
    
  } catch (error) {
    console.error("Erro no login:", error);  // Log do erro para diagnóstico
    return res.status(500).send({ message: 'Erro no servidor', error });
  }
};

// Sair do Chat (Exclusão de Usuário)
exports.sairChat = async (nick) => {
  try {
    let user = await usuarioModel.buscarUsuario(nick);
    if (user) {
      let resp = await usuarioModel.excluirUsuario(user._id);
      if (resp.deletedCount) {
        return { msg: 'Ok, saiu do chat', timestamp: Date.now() };
      }
    }
    return false;
  } catch (error) {
    console.log("Erro ao sair do chat:", error);
    return false;
  }
};
