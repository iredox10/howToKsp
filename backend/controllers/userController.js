import HowTo from "../models/howTo.js";
import Comment from "../models/comment.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
const createJwt = (userId, email) => {
  return jwt.sign({ userId, email }, "secretKey");
};

export const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const jwt = createJwt(user._id, user.email);
    res.status(201).json({ user, jwt });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json("user not found");
    }
    if (user.password !== req.body.password) {
      return res.status(303).json("password not correct");
    }
    const jwt = createJwt(user._id, user.username);
    res.status(200).json({ user, jwt });
  } catch (err) {
    res.json(err.message);
  }
};

export const comment = async (req, res) => {
  try {
    const howto = await HowTo.findOne({ slug: req.params.slug });
    //  const user = await User.findOne({username: req.body.username})
    const comment = await Comment.create({
      user: req.body.username,
      comment: req.body.comment,
    });
    howto.comments.push(comment);
    howto.save();
    res.status(201).json({ comment, howto });
  } catch (err) {
    res.status(405).json(err.message);
  }
};

export const comment_reply = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    // const howto = await HowTo.findOne({ slug: req.params.slug });

    const comment = await Comment.findById(req.params.id);
    comment.replies.push({ user: user.username, comment: req.body.reply });
    comment.save();
    res.status(201).json({ reply: comment.replies });
  } catch (err) {
    res.statu(303).json(err.message);
  }
};

export const get_reply_comment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    const reply = comment.replies.find((c) => c._id == req.params.replyId);
    res.json(reply);
  } catch (err) {
    res.json(err.message);
  }
};

export const post_reply_comment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    const reply = comment.replies.find((c) => c._id == req.params.replyId);
    reply.replies.push({ user: req.body.user, comment: req.body.reply });
    reply.save();
    res.json(reply);
  } catch (err) {
    res.json(err.message);
  }
};

export const get_comments = async (req, res) => {
  try {
    const comments = await HowTo.findOne({ slug: req.params.slug }).populate(
      "comments"
    );
    res.status(200).json({ comments: comments.comments });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const get_comment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
