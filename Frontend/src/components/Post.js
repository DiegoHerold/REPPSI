import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Stack,
  Textarea,
  Input,
  SimpleGrid,
  useToast,
  Image,
  Flex,
  IconButton,
  Tag,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ChatIcon } from "@chakra-ui/icons";
import  HeartIcon  from "./icones/Heart"; // Ícone personalizado do coração

const Post = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      type: "text",
      content: "Minha primeira postagem sobre saúde mental!",
      likes: 10,
      comments: ["Muito bom!", "Ótimo conteúdo!"],
      showComments: false,
    },
    {
      id: 2,
      type: "image",
      content: "https://picsum.photos/300",
      caption: "Uma imagem relaxante",
      likes: 25,
      comments: ["Linda imagem!", "Inspirador!"],
      showComments: false,
    },
    {
      id: 3,
      type: "video",
      content: "https://www.w3schools.com/html/mov_bbb.mp4",
      caption: "Meu último vídeo sobre meditação",
      likes: 30,
      comments: ["Amei o vídeo!", "Muito útil!"],
      showComments: false,
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const toast = useToast();

  const handleAddPost = (type, content, caption = "") => {
    const newPost = {
      id: posts.length + 1,
      type,
      content,
      caption,
      likes: 0,
      comments: [],
      showComments: false,
    };
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
    toast({
      title: "Postagem apagada.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEditPost = (id, updatedContent) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, content: updatedContent } : post
    );
    setPosts(updatedPosts);
    toast({
      title: "Postagem atualizada.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const toggleComments = (id) => {
    setPosts(posts.map((post) =>
      post.id === id ? { ...post, showComments: !post.showComments } : post
    ));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleAddPost("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleAddPost("video", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box mt={8} p={6} bg="primary.100" borderRadius="lg" boxShadow="lg">
      <Text fontSize={{ base: "lg", md: "xl" }} color="primary.400" fontWeight="bold" mb={4}>
        Postagens
      </Text>
      <Stack spacing={4}>
        <Textarea
          placeholder="O que você gostaria de compartilhar?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <Stack direction="row" spacing={4}>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          <Input type="file" accept="video/*" onChange={handleVideoUpload} />
        </Stack>
        <Button
          onClick={() => handleAddPost("text", newPost)}
          colorScheme="primary"
          bg="primary.400"
          color="white"
          _hover={{ bg: "primary.500" }}
        >
          Postar
        </Button>
      </Stack>

      <SimpleGrid mt={6} columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {posts.map((post) => (
          <Box key={post.id} bg="primary.100" p={4} borderRadius="md" boxShadow="md">
            {post.type === "text" && <Text color="gray.600">{post.content}</Text>}
            {post.type === "image" && (
              <>
                <Image src={post.content} alt="Post Image" borderRadius="md" mb={2} />
                <Text>{post.caption}</Text>
              </>
            )}
            {post.type === "video" && (
              <>
                <video controls width="100%" style={{ borderRadius: "8px", marginBottom: "8px" }}>
                  <source src={post.content} type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
                <Text>{post.caption}</Text>
              </>
            )}

            {/* Botões de Curtida, Comentário, Editar e Apagar */}
            <Flex justify="space-between" align="center" mt={4}>
              <IconButton
                aria-label="Amei"
                icon={<HeartIcon />}
                colorScheme="red"
                onClick={() => alert("Você amou esta postagem!")}
              />
              <IconButton
                aria-label="Editar"
                icon={<EditIcon />}
                onClick={() => handleEditPost(post.id, prompt("Editar Postagem", post.content))}
              />
              <IconButton
                aria-label="Apagar"
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleDeletePost(post.id)}
              />
              <Button size="sm" onClick={() => toggleComments(post.id)} leftIcon={<ChatIcon />} variant="outline">
                Comentários
              </Button>
            </Flex>

            {/* Comentários expansíveis */}
            {post.showComments && (
              <Stack mt={2} spacing={1}>
                {post.comments.map((comment, index) => (
                  <Text key={index} color="gray.500">
                    - {comment}
                  </Text>
                ))}
              </Stack>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Post;
