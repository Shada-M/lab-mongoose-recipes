const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Add all recipes from data.json to the database
    return Recipe.insertMany(data);
  })
  .then(() => {
    // Update the duration of "Rigatoni alla Genovese" to 100
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    console.log('Duration for "Rigatoni alla Genovese" updated successfully!');
   
  })
  .then(() => {
    // Remove the "Carrot Cake" recipe from the database
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Recipe "Carrot Cake" removed successfully!');
    mongoose.connection.close();
  })
 

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
