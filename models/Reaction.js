const { Schema, Types } = require("mongoose");
const { dateString } = require("../utils/dateFormat");

// This will not be a model, but rather will be used as the reaction field's sub-document schema in the Thought model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //   TODO : Use a getter method to format the timestamp on query
      get: (timeStamp) => {
        dateString();
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);





module.exports = reactionSchema;
