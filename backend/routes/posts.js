const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/post-controller');
const authenticate = require('../middleware/auth');
const { postValidator } = require('../validations/post');
const { validationResult } = require('express-validator');
const { validate } = require('../middleware/validate');
const { upload } = require('../middleware/upload');
const router = express.Router();

/**
 * @swagger
 * /posts:
 *   post:
 *     description: Создание нового поста
 *     responses:
 *       200:
 *         description: Пост успешно создан
 */
router.post('/', authenticate, upload.single('media'), postValidator, validate, createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     description: Получение всех постов
 *     responses:
 *       200:
 *         description: Список всех постов
 */
router.get('/', getAllPosts);

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     description: Получение одного поста
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID поста
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Пост найден
 *       404:
 *         description: Пост не найден
 */
router.get('/:postId', getPostById);

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     description: Редактирование поста
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID поста
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Пост успешно обновлен
 */
router.put('/:postId', authenticate, upload.single('media'), postValidator, validate, updatePost);

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     description: Удаление поста
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID поста
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Пост успешно удален
 */
router.delete('/:postId', authenticate, deletePost);

module.exports = router;
