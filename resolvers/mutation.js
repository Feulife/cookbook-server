import Recipe from '../models/recipe.js'

const mutation = {
  create: async (_, { title, ingredient, content, createdAt }) => {
    const newRecipe = new Recipe({ title, ingredient, content, createdAt });
    await newRecipe.save();
    return newRecipe;
  },

  delete: async (_, { id }) => {
    const result = await Recipe.deleteOne({ _id: id });
    if (result.acknowledged && result.deletedCount == 1) {
      return id;
    }
    return null;
  },
  
  edit: async (_, { id, title, ingredient, content, updatedAt }) => {
    const result = await Recipe.updateOne(
      { _id: id },
      { $set: { title, ingredient, content, updatedAt } }
    );
    if (result.acknowledged && result.modifiedCount == 1) {
      return await Recipe.findOne({ _id: id });
    }
    return null;
  }
}

export default mutation