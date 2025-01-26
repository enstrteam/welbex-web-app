const fs = require("fs");
const path = require("path");
const { Post, User } = require("../models");
const { upload } = require("../middleware/upload");

// Получение всех постов
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
      ],
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Получение одного поста
const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
      ],
    });

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || typeof content !== "string" || content.trim() === "") {
      return res
        .status(400)
        .json({ message: "Content is required and must be a string" });
    }

    let mediaFileImage = null;
    let mediaFileVideo = null;
    let imageType = "none"; // default value if no image is provided
    let videoType = "none"; // default value if no video is provided

    // Разделяем логику для изображения и видео
    if (req.file) {
      if (req.file.mimetype.startsWith("image/")) {
        mediaFileImage = `/images/${req.file.filename}`;
        imageType = req.file.mimetype; // Сохраняем тип изображения
      } else if (req.file.mimetype.startsWith("video/")) {
        mediaFileVideo = `/videos/${req.file.filename}`;
        videoType = req.file.mimetype; // Сохраняем тип видео
      }
    }

    const post = await Post.create({
      content,
      image: mediaFileImage,
      video: mediaFileVideo,
      imageType, // Передаем тип изображения
      videoType, // Передаем тип видео
      userId: req.user.userId,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const post = await Post.findByPk(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.userId !== req.user.userId)
      return res
        .status(403)
        .json({ message: "You are not the author of this post" });

    let mediaFileImage = post.image;
    let mediaFileVideo = post.video;
    let imageType = post.imageType;
    let videoType = post.videoType;

    if (req.file) {
      if (req.file.mimetype.startsWith("image/")) {
        if (mediaFileImage) {
          const filePath = path.join(__dirname, "../public", mediaFileImage);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        mediaFileImage = `/images/${req.file.filename}`;
        imageType = req.file.mimetype; // Обновляем тип изображения
      } else if (req.file.mimetype.startsWith("video/")) {
        if (mediaFileVideo) {
          const filePath = path.join(__dirname, "../public", mediaFileVideo);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        mediaFileVideo = `/videos/${req.file.filename}`;
        videoType = req.file.mimetype; // Обновляем тип видео
      }
    }

    post.content = content || post.content;
    post.image = mediaFileImage;
    post.video = mediaFileVideo;
    post.imageType = imageType; // Обновляем тип изображения
    post.videoType = videoType; // Обновляем тип видео

    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Удаление поста
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByPk(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.userId !== req.user.userId)
      return res
        .status(403)
        .json({ message: "You are not the author of this post" });

    const mediaFile = post.image || post.video;
    if (mediaFile) {
      const filePath = path.join(__dirname, "../public", mediaFile);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
