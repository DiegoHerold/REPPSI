const db = require("./db");

// Criar uma nova postagem
async function adicionarPost(post) {
    console.log("Criando nova postagem:", post);
    return await db.insertOne("Postagens", post);
}

async function criarPost({ userId, username, profilePicture, post }) {
    console.log("Verificando se o usuário já possui posts:", userId);

    // Estrutura do novo post
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

    // Verifica se o documento do usuário já existe
    const existingUserPost = await db.findOneUserId("Postagens", { userId: new ObjectId(userId) });

    if (existingUserPost) {
        // Adiciona o novo post ao array 'posts' se o usuário já existir
        console.log("Usuário encontrado, adicionando novo post.");
        return await db.updateOne(
            "Postagens",{ $push: { posts: newPost } },
            { userId: new ObjectId(userId) }
            
        );
    } else {
        // Cria um novo documento de usuário com o post inicial
        console.log("Usuário não encontrado, criando novo documento.");
        const postagem = {
            _id: new ObjectId(),
            userId: new ObjectId(userId),
            username: username,
            profilePicture: profilePicture || null,
            posts: [newPost] // Inicializa com o primeiro post
        };
        return await db.insertOne("Usuarios", postagem);
    }
}
//comentarios
async function adicionarComentario(userId, username, comentario) {
    console.log("Adicionando comentário ao post:",username, "do usuário:", userId);

    const filter = { userId: new ObjectId(userId) };
    const update = { $push: { "posts.$.comments": comentario } };

    return await db.updateOnePush("Postagens", filter, update);
}
// Buscar uma postagem por ID
async function buscarPostPorId(postId) {
    console.log("Buscando postagem por ID:", postId);
    return await db.findOneUserId("Postagens", postId);
}

// Buscar todas as postagens de um usuário
async function buscarPostagensPorUsuario(userId) {
    console.log("Buscando todas as postagens do usuário:", userId);
    return await db.findOneUserId("Postagens", userId );
}

// Atualizar uma postagem
async function atualizarPost(postId, updates) {
    console.log("Atualizando postagem com ID:", postId);
    return await db.updateOne("Postagens", postId, { $set: updates });
}

// Apagar uma postagem
async function apagarPost(postId) {
    console.log("Apagando postagem por ID:", postId);
    return await db.deleteOne("Postagens", postId);
}

// Apagar todas as postagens de um usuário
async function apagarTodasPostagens(userId) {
    console.log("Apagando todas as postagens do usuário:", userId);
    return await db.deleteAlls("Postagens", { userId });
}

module.exports = {
    adicionarPost,
    criarPost,
    adicionarComentario,
    buscarPostPorId,
    buscarPostagensPorUsuario,
    atualizarPost,
    apagarPost,
    apagarTodasPostagens,
};
