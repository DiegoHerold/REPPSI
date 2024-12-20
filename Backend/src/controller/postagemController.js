const db = require("../model/db");
const postagemModel = require("../model/postagemModel")
const { ObjectId } = require('mongodb');




// Função para criar um novo post para o usuário
// async function criarPost(req, res) {
//     try {
//         const {  username, profilePicture, post } = req.body;
//         const userId = req.query.idPsicologo

//         if (!userId || !title || !content) {
//             return res.status(400).send({ message: 'Campos obrigatórios ausentes' });
//         }

//         const postInfo = {
//             userId,
//             username,
//             profilePicture,
//             post: { title:post.title, content:post.content, imageURL: post.imageURL, videoURL:post.videoURL, tags:post.tags }
//         };

//         // Chama o model para criar ou adicionar o post
//         const resultado = await postagemModel.criarPost(postInfo);

//         if (resultado) {
//             res.status(201).send({ success: true, message: 'Postagem criada com sucesso' });
//         } else {
//             res.status(400).send({ message: 'Erro ao criar postagem' });
//         }
//     } catch (error) {
//         console.error("Erro ao criar postagem:", error);
        
//     }
// };


async function criarPost(userId, posts) {
    const post= posts.post
    console.log("Criando nova postagem para o usuário:", userId);
    console.log("Criando nova postagem para o usuário:",JSON.stringify(post));

    const newPost = {
        _id: new ObjectId(),
        title: post.title,
        content: post.content,
        imageURL: post.imageURL || null,
        videoURL: post.videoURL || null,
        likes: 0,
        comments: [],
        tags: post.tags || [],
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const postagem ={
        "_id": new ObjectId(),
        "userId": new ObjectId(userId) ,
        "username": posts.username ,
        "profilePicture": posts.profilePicture,
        "posts": newPost
    }

    return await postagemModel.adicionarPost(postagem) // Certifique-se de que $push está dentro de um objeto de atualização

}


// Adicionar um comentário a uma postagem
async function adicionarComentario (req, res) {
    try {
        const { username, commentText } = req.body;
        const userId = req.query.idUser;

        if (!username|| !commentText) {
            return res.status(400).send({ message: 'Campos obrigatórios ausentes' });
        }

        // Cria o novo comentário
        const comentario = {
            userId: userId,
            username: req.body.username || "Anônimo",  // Padrão para "Anônimo" se não for fornecido
            commentText: commentText,
            createdAt: new Date()
        };

        // Chama o model para adicionar o comentário
        const resultado = await postagemModel.adicionarComentario(userId,username, comentario);
        if (resultado.modifiedCount > 0) {
            res.status(200).send({ success: true, message: 'Comentário adicionado com sucesso' });
        } else {
            res.status(400).send({ message: 'Erro ao adicionar comentário' });
        }
    } catch (error) {
        console.error("Erro ao adicionar comentário:", error);
        
    }
};

// Atualizar número de curtidas (incrementar ou decrementar)
async function atualizarLikes(userId, postId, increment = 1) {
    console.log("Atualizando curtidas no post:", postId, "do usuário:", userId);

    return await db.updateOne(
        "Usuarios",
        { _id: new ObjectId(userId), "posts._id": new ObjectId(postId) },
        { $inc: { "posts.$.likes": increment } }
    );
}

// Buscar todas as postagens de um usuário
async function buscarPostagensPorUsuario(userId) {
    console.log("Buscando todas as postagens do usuário:", userId);
    const user = await postagemModel.buscarPostagensPorUsuario(userId)
    return user ;
}

// Buscar uma postagem específica por ID dentro do array de postagens de um usuário
async function buscarPostPorId(userId, postId) {
    console.log("Buscando postagem por ID:", postId, "do usuário:", userId);
    const user = await db.findOneUserId("Usuarios", new ObjectId(userId));
    return user ? user.posts.find(post => post._id.toString() === postId) : null;
}

// Atualizar uma postagem específica de um usuário
async function atualizarPost(userId, postId, updates) {
    console.log("Atualizando postagem com ID:", postId, "do usuário:", userId);

    const updateFields = {
        "posts.$.title": updates.title,
        "posts.$.content": updates.content,
        "posts.$.imageURL": updates.imageURL || null,
        "posts.$.videoURL": updates.videoURL || null,
        "posts.$.tags": updates.tags || [],
        "posts.$.updatedAt": new Date()
    };

    return await db.updateOne(
        "Usuarios",
        { _id: new ObjectId(userId), "posts._id": new ObjectId(postId) },
        { $set: updateFields }
    );
}

// Apagar uma postagem específica de um usuário
 async function apagarPost(consultaId){
    console.log("consultaid:"+consultaId)
  try {
    const deletedConsulta = await postagemModel.apagarPost(consultaId);
    if (deletedConsulta.deletedCount) 
        return true;
    else
        return false
  } catch (error) {
    return res.status(500).send({ message: 'Erro no servidor', error });
  }
};

// Apagar todas as postagens de um usuário
async function apagarTodasPostagens(userId) {
    console.log("Apagando todas as postagens do usuário:", userId);
    return await db.updateOne(
        "Usuarios",
        { _id: new ObjectId(userId) },
        { $set: { posts: [] } }
    );
}

module.exports = {
    criarPost,
    adicionarComentario,
    atualizarLikes,
    buscarPostagensPorUsuario,
    buscarPostPorId,
    atualizarPost,
    apagarPost,
    apagarTodasPostagens,
};
