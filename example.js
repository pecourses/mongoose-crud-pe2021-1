const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/test')
  .then(data => console.log(`Connection OK`))
  .catch(err => console.log(`err`, err));

const taskSchema = new Schema({
  value: String,
  user_id: mongoose.ObjectId,
});

const Task = mongoose.model('tasks', taskSchema);
(async () => {
  // find
  const foundTasks = await Task.find().limit(2);
  console.log(`foundTasks`, foundTasks);

  //create
  const newTask = {
    value: 'Relax',
    user_id: mongoose.Types.ObjectId('616adec08a81664fabb515e6'),
  };
  const newTaskInstance = new Task(newTask);
  const createdTask = await newTaskInstance.save();
  console.log(`createdTask`, createdTask);

  //findById
  const taskId = '616c19c22ec105d4614d95c1';
  const foundTask = await Task.findById(taskId);
  console.log(`foundTask`, foundTask);

  //updateById
  const updateForTask = { value: 'Relax' };
  const updatedTask = await Task.findByIdAndUpdate(taskId, updateForTask);
  console.log(`updatedTask`, updatedTask);

  //deleteById
  const deletedTask = await Task.findByIdAndDelete(taskId);
  console.log(`deletedTask`, deletedTask);
})();
