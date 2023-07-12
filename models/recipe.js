import mongoose from "mongoose";

const RecipeScema = mongoose.Schema( {
    title: String,
    ingredient: String,
    content: String,
    createdAt: String,
    updatedAt: String,
    like: Boolean,
  });
  
  RecipeScema.index( {title: "text"}, {ingredient: "text"});
  const Recipe = mongoose.model('Recipe', RecipeScema)
  export default Recipe;