const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { secret } = require("../config/config");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
