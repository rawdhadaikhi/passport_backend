// call back function register
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

const secretOrKey = config.get("secretOrKey");
exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    address,
    city,
    profession,
  } = req.body;
  try {
    // validate email was unique
    const searchRes = await User.findOne({ email });
    console.log(searchRes);
    if (searchRes)
      return res.status(401).json({ msg: `user is already exists !!` });
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      address,
      city,
      profession,
    });
    // crypt the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;
    //save user
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error });
  }
};

//  call back function login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(`password`, password);
  try {
    // get one user
    const user = await User.findOne({ email });
    console.log(`user`, user);
    if (!user) return res.status(404).json({ msg: `user not found !` });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: ` password not matched` });
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(payload, secretOrKey);
    return res.status(200).json({ token: `Bearer ${token}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: error });
  }
};
