const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // get a single Thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const user = await User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "incorrect id, please try again" });
      }

      res.json({ thought, user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "incorrect id, please try again" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.body.thoughtId,
      });

      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $pull: { thoughts: req.body.thoughtId } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "incorrect id, please try again" });
      }

      res.json({ message: "Thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};