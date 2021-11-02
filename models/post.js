const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    // свойство-опция ref -- ссылка на другую модель
    /* подобно внешнему ключу, но нет проверки ограничений целостности,
       то есть не перпятствует созданию поста для несуществующег юзера
    */
    // используется для метода Post.populate():
    // - find() возвращает посты
    // - populate() возвращает посты со связанными юзерами
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    // опция timestamps автоматически добавляет поля createdAt, updatedAt в документы
    timestamps: true,
    // опция versionKey убирает (не добавляет) поле __v из документов
    versionKey: false,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
