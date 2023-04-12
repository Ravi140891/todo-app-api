const Boom = require("boom");
const { knex } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/User");

const UserController = {
  async create(request, h) {
    const { name, email, password } = request.payload;

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await User.query(knex).insert({ name, email, password: hashedPassword });
      return { message: "User created successfully" };
    } catch (error) {
      throw Boom.badRequest(error.message);
    }
  },

  async login(request, h) {
    const { email, password } = request.payload;

    try {
      const user = await User.query().findOne({ email });

      if (!user) {
        throw Boom.unauthorized("Invalid username or password");
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        throw Boom.unauthorized("Invalid username or password");
      }

      const userId = user.id;
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "4d",
      });

      return { token };
    } catch (error) {
      throw Boom.badRequest(error.message);
    }
  },

  async findByUsername(email) {
    const user = await User.query(knex).findOne({ email });
    return user;
  },
};

module.exports = UserController;
