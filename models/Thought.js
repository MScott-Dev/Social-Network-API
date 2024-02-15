const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const { dateString } = require("../utils/dateFormat");

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //   TODO : Use a getter method to format the timestamp on query
      get: (timeStamp) => {
        dateString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// Create a virtual property `reactionCount` that gets the amount of comments per post
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
