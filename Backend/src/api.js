const express = require('express');
const cors = require('cors'); 
const path = require('path');
const router = express.Router();
const app = express();

// Middleware CORS - permite que o frontend acesse a API
app.use(cors({
    origin: 'http://localhost:3000',  // Permita somente o frontend no localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization']  // Cabeçalhos permitidos
  }));
  
app.use(express.urlencoded({extended  : true}));
app.use(express.json());


const token = require('./util/token');
const usuarioController = require("./controller/usuarioController");
const consultasController = require("./controller/consultasController")
const postagemController = require("./controller/postagemController");
const authMiddleware = require('./middleware/authMiddleware');
//page
const PORT = process.env.PORT || 3000;
// Middleware para servir arquivos estáticos da pasta view
app.use(express.static(path.join(__dirname, '..', '..', 'Frontend', 'build')));


// começo de rotas

app.get('/sobre', (req, res) => {
    res.status(200).send({
        nome: "REPPSI",
        descrição: "Rede de Profissionais de Psicologia",
        versão: "1.0",
        autor: "Diego Herold"
    });
});



// Login e Cadastro
app.post('/cadastrar', usuarioController.registrarUsuario);
app.post('/entrar', usuarioController.loginUsuario);

// Middleware de autenticação para rotas protegidas
// app.use(authMiddleware);

// Rotas do Dashboard
app.get("/dashboard/get", async (req, res) => {
    let resp = await usuarioController.get();
    console.log("mostrando psicologos no home:", resp);
    res.status(200).send(resp);
});
//traz psicologos com filtro
app.post("/usuario/filtrar", async (req, res) => { 
    try {
        const resp = await usuarioController.filtrar(req.body); // Passa `filtros` para a função `filtrar`
        console.log("Resultado da filtragem:", resp);
        res.status(200).send(resp);
    } catch (error) {
        console.error("Erro ao filtrar usuários:", error);
        res.status(500).send({ message: "Erro ao filtrar usuários", error });
    }
});
app.post("/usuario", async (req, res) => { 
    try {
        const resp = await usuarioController.usuario(req.body); // Passa `filtros` para a função `filtrar`
        console.log("Resultado da filtragem:", resp);
        res.status(200).send(resp);
    } catch (error) {
        console.error("Erro ao filtrar usuários:", error);
        res.status(500).send({ message: "Erro ao filtrar usuários", error });
    }
});


// Atualizar usuário
app.put("/atualizar", async (req, res) => {
    let resp = await usuarioController.atualizarUsuario(req.query.token, req.body);
    console.log("atualizando :", resp);
    res.status(200).send(resp);
});

// Apagar usuário
app.delete("/usuario/apagar", async (req, res) => {
    let resp = await usuarioController.apagarConta(req.query.idUser);
    console.log("apagando :", resp);
    res.status(200).send(resp);
});

// Rotas de Consultas
// Criar consulta
app.post("/consulta/criar", async (req, res) => {
    console.log("passou rota criar consulta");
    await consultasController.criarConsulta(req, res);  // Passa `req` e `res` para o controlador
});
// Atualizar consulta
// app.post("/consulta/atualizar", async (req, res) => {
//     console.log("passou rota atualizar consulta");
//     await consultasController.updateConsulta(req.query.idUser, req.body);
// });
// Listar consultas de um usuario
app.get("/consultas/get", async (req, res) => {
    let resp = await consultasController.get(req.query.token);
    console.log("mostrando historico de consuta:", resp);
    res.status(200).send(resp);
});
// Atualizar uma consulta do usuario usuário
app.delete("/consulta/atualizar", async (req, res) => {
    let resp = await consultasController.updateConsulta(req.query.idConsulta,req.body.status);
    console.log("apagando :", resp);
    res.status(200).send(resp);
});
// Apagar uma consulta do usuario usuário
app.delete("/consulta/apagar", async (req, res) => {
    let resp = await consultasController.deleteConsulta(req.query.idConsulta);
    console.log("apagando :", resp);
    res.status(200).send(resp);
});
//apagarar todas as consultas do usuario
app.delete("/consultas/apagar", async (req, res) => {
    let resp = await consultasController.deleteTodasConsultas(req.query.idUser,req.query.consultas);
    console.log("apagando :", resp);
    res.status(200).send(resp);
});

// Rotas de Postagens
// Criar Postagem
app.post("/postagem/criar", async (req, res) => {
    console.log("passou rota criar postagem");
    let resp = await postagemController.criarPost(req.query.idPsicologo,req.body); 
    res.status(200).send(resp);
});
// Atualizar consulta
app.post("/consulta/atualizar", async (req, res) => {
    console.log("passou rota atualizar consulta");
    console.log("req.body:",req.body);
    let resp =  await consultasController.updateConsulta(req.query.idConsulta, req.body);
    res.status(200).send(resp);
});
// Listar consultas de um usuario
app.get("/postagens", async (req, res) => {
    let resp = await postagemController.buscarPostagensPorUsuario(req.query.idUser);
    console.log("mostrando postagens:", resp);
    res.status(200).send(resp);
});
// Comentarios nas Postagens
app.post("/postagem/comentario", async (req, res) => {
    console.log("passou rota atualizar consulta");
    await postagemController.adicionarComentario(req.query.idUser, req.body);
});
// Apagar uma consulta do usuario usuário
app.delete("/postagem/apagar", async (req, res) => {
    let resp = await postagemController.apagarPost(req.query.idPostagem);
    console.log("apagando :", resp);
    res.status(200).send(resp);
});
//apagar todas as consultas do usuario




// Configuração para servir o index.html do frontend para qualquer rota desconhecida
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'Frontend', 'build', 'index.html'));
});
// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});











// //FEED
// //Listar Postagens
// app.use("/postagens", router.get("/postagens", async (req,res)=>{
//     if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
//     return false;
    
//     let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
//     res.status(200).send(resp);

// }))

// //Enviar Comentario
// app.use("/postagens/comentario", router.post("/postagens/comentario"), async (req,res) =>{
//     if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
//         return false;
//     let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
//     res.status(200).send(resp);
// })
// //Amei
// app.use("/postagens/Amei", router.post("/postagens/amei"), async (req,res) =>{
//     if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
//         return false;
//     let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
//     res.status(200).send(resp);
// })

// //Consultas
// //listar histórico
// app.use("/consultas/get", router.get("/consultas/get", async (req,res)=>{
//     if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
//     return false;
    
//     let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
//     res.status(200).send(resp);

// }))
// //Espera
// app.use("/consultas/espera", router.get("/consultas/espera", async (req,res)=>{
//     if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
//     return false;
    
//     let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
//     res.status(200).send(resp);

// }))
// //entar Chamada
// //sair Chamada

// //Agendamento


// //Perfil
// //criar conteudo
// app.use('/sala/criar', router.post('/sala/criar', async (req, res) => {
//     if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
//         return false;

//     // Extrair os dados necessários do corpo da requisição
//     const { nome, tipo } = req.body;

//     // Chamar o controlador para criar a sala
//     let resp = await salaController.criarSala(req.headers.iduser, nome, tipo);
//     res.status(200).send(resp);
// }))

// //apagar conteudo
// app.use("/sala/sair", router.put("/sala/sair", async (req,res)=>{
//     if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
//         return res.status(401).send("Token inválido");
//     let resp = await salaController.sairSala(req.query.idSala, req.query.idUser);
//     res.status(200).send(resp);

// }))
// //listar conteudo
// app.use("/salas",router.get("/salas",async (req, res, next)=>{
//     if(await token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
//         let resp = await salaController.get();
//         res.status(200).send(resp);
//     }else{
//         res.status(400).send({msg:"Usuário não autorizado"});
//     }
// }))

// //Salas 
// //entrar na sala
// app.use("/sala/entrar/", router.put("/sala/entrar", (async (req, res) => {
//     if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
//         return res.status(401).send("Token inválido");
//     let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
//     res.status(200).send(resp);
// })))

// criar sala
// app.use('/sala/criar', router.post('/sala/criar', async (req, res) => {
//     if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
//         return false;

//     // Extrair os dados necessários do corpo da requisição
//     const { nome, tipo } = req.body;

//     // Chamar o controlador para criar a sala
//     let resp = await salaController.criarSala(req.headers.iduser, nome, tipo);
//     res.status(200).send(resp);
// }))

// //sair da sala
// app.use("/sala/sair", router.put("/sala/sair", async (req,res)=>{
//     if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
//         return res.status(401).send("Token inválido");
//     let resp = await salaController.sairSala(req.query.idSala, req.query.idUser);
//     res.status(200).send(resp);

// }))



// //listar salas
// app.use("/salas",router.get("/salas",async (req, res, next)=>{
//     if(await token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
//         let resp = await salaController.get();
//         res.status(200).send(resp);
//     }else{
//         res.status(400).send({msg:"Usuário não autorizado"});
//     }
// }))

// //Mensagens 
// //Enviar Mensagem
// app.use("/sala/mensagem", router.post("/sala/mensagem"), async (req,res) =>{
//     if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
//         return false;
//     let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
//     res.status(200).send(resp);
// })
// //listar mensagens
// app.use("/sala/mensagens", router.get("/sala/mensagens", async (req,res)=>{
//     if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
//     return false;
    
//     let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
//     res.status(200).send(resp);

// }))





module.exports=app;