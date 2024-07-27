import Review from '../models/review.model.js'

const getRating = async (id) => {
  try {
    const result = await Review.aggregate([
      { $match: { restaurant: id } },
      { $group: { _id: null, averageRating: { $avg: "$rating" } } }
    ]);

    return result.length > 0 ? result[0].averageRating : 0;
  }
  catch (error) {
    throw error;
  }
}

export default getRating