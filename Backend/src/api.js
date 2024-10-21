const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();


app.use(express.urlencoded({extended  : true}));
app.use(express.json());


const token = require('./util/token');
const salaController = require("./controller/salaController");
const usuarioController = require("./controller/usuarioController");
//page
const PORT = process.env.PORT || 3000;
// Middleware para servir arquivos estáticos da pasta view
app.use(express.static(path.join(__dirname, '..', '..', 'Frontend', 'build')));


// começo de rotas

// Qualquer rota que não seja da API deve servir o frontend
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'Frontend', 'build', 'index.html'));
//   });



// Configuração da rota para servir o index.html
// Todas as outras rotas devem retornar o index.html do React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'Frontend', 'build', 'index.html'));
});
//
//
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
//
//
//
//sobre a API
app.post('/api/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    // Lógica para cadastrar o usuário na base de dados
    res.status(201).send({ message: ' buuuuuum Usuário cadastrado com sucesso!' });
  });

app.use('/',  router.get('/sobre',(req,res, next)=>{
    res.status(200).send({
        "nome":"REPPSI",
        "descrição": "Rede de Profissionais de Psicologia",
        "versão": "1.0",
        "autor": "Diego Herold"
    })
}));

//Chat
//entrar no chat
app.use('/cadastrar',  router.post('/cadastrar', async(req,res, next)=>{
    let resp = await usuarioController.entrar(req.body.nome,req.body.email, req.body.senha);
    res.status(200).send(resp);
}));
app.use('/entrar', (req, res) => {
    const { email, senha } = req.body;
    // Lógica para cadastrar o usuário na base de dados
    res.status(200).send({ message: `buuuuuum Usuário cadastrado com sucesso!  email:${email},senha:${senha}`});
  });

// sair do chat
app.use('/sair', router.put('/sair', async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await usuarioController.sairChat(req.headers.iduser);

    res.status(200).send(resp);
}));
//Dashboard
//entrar no Dashboard
app.use("/dashboard", router.put("/dashboard", (async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send("Token inválido");
    let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
})))
//listar Psicologos, informações, conteudos.
app.use("/dashboard/get",router.get("/dashboard/get",async (req, res, next)=>{
    if(await token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
        let resp = await salaController.get();
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"Usuário não autorizado"});
    }
}))


//FEED
//Listar Postagens
app.use("/postagens", router.get("/postagens", async (req,res)=>{
    if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
    return false;
    
    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);

}))

//Enviar Comentario
app.use("/postagens/comentario", router.post("/postagens/comentario"), async (req,res) =>{
    if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
})
//Amei
app.use("/postagens/Amei", router.post("/postagens/amei"), async (req,res) =>{
    if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
})

//Consultas
//listar histórico
app.use("/consultas/get", router.get("/consultas/get", async (req,res)=>{
    if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
    return false;
    
    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);

}))
//Espera
app.use("/consultas/espera", router.get("/consultas/espera", async (req,res)=>{
    if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
    return false;
    
    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);

}))
//entar Chamada
//sair Chamada

//Agendamento


//Perfil
//criar conteudo
app.use('/sala/criar', router.post('/sala/criar', async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

    // Extrair os dados necessários do corpo da requisição
    const { nome, tipo } = req.body;

    // Chamar o controlador para criar a sala
    let resp = await salaController.criarSala(req.headers.iduser, nome, tipo);
    res.status(200).send(resp);
}))

//apagar conteudo
app.use("/sala/sair", router.put("/sala/sair", async (req,res)=>{
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send("Token inválido");
    let resp = await salaController.sairSala(req.query.idSala, req.query.idUser);
    res.status(200).send(resp);

}))
//listar conteudo
app.use("/salas",router.get("/salas",async (req, res, next)=>{
    if(await token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
        let resp = await salaController.get();
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"Usuário não autorizado"});
    }
}))

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