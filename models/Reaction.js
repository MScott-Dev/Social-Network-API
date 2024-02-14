const { Schema, model } = require("mongoose");


// Schema to create thought model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //   TODO : Use a getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);



// Initialize our User model
const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;
