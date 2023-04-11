const Boom = require("@hapi/boom");
const { knex } = require("../db");
const Category = require("../models/Category");
const jwt = require("jsonwebtoken");

const CategoryController = {
  async findAll(request, h) {
    try {
      const { authorization } = request.headers;
      if (!authorization) {
        throw Boom.unauthorized("Authorization header missing");
      }
      const token = authorization.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const categories = await Category.query().where({
        userId: decoded.userId,
      });
      return categories;
    } catch (error) {
      console.log(error);
      throw Boom.unauthorized("Invalid token");
    }
  },

  async create(request, h) {
    const { payload } = request;
    const { authorization } = request.headers;

    if (!authorization) {
      throw Boom.unauthorized("Missing or invalid authorization header");
    }

    const token = authorization && authorization.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { userId } = decodedToken;
      const { name } = payload;
      if (!name) {
        throw Boom.badRequest("Category name is required");
      }
      if (!userId) {
        throw Boom.badRequest("User ID is missing");
      }

      const category = await Category.query().insert({
        name,
        userId: userId,
      });

      return category;
    } catch (error) {
      console.log(error);
      throw Boom.unauthorized("Invalid token");
    }
  },

  async update(request, h) {
    try {
      const { authorization } = request.headers;
      if (!authorization) {
        throw Boom.unauthorized("Authorization header missing");
      }

      const token = authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { userId } = decodedToken;

      const { id } = request.params;
      const { name } = request.payload;
      if (!name) {
        throw Boom.badRequest("Category name is required");
      }

      const category = await Category.query().findOne({
        id,
        userId,
      });

      if (!category) {
        throw Boom.notFound(`Category with id ${id} not found`);
      }

      const updatedCategory = await category.$query().patchAndFetch({
        name,
      });

      return updatedCategory;
    } catch (error) {
      console.log(error);
      throw Boom.unauthorized("Invalid token");
    }
  },
  async delete(request, h) {
    try {
      const { authorization } = request.headers;
      if (!authorization) {
        throw Boom.unauthorized("Authorization header missing");
      }
      const token = authorization.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = request.params;
      const category = await Category.query(knex).findOne({
        id,
        userId: decoded.userId,
      });
      if (!category) {
        throw Boom.notFound("Category not found");
      }
      const deletedCount = await category.$query(knex).delete();
      if (deletedCount === 0) {
        throw Boom.notFound("Category not found");
      }
      return h.response({ message: "deleted successfully" }).code(200);
    } catch (error) {
      console.log(error);
      throw Boom.unauthorized("Invalid token");
    }
  },
};

module.exports = CategoryController;
