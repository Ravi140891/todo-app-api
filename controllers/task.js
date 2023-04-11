const Boom = require("@hapi/boom");
const Task = require("../models/Task");
const knex = require("knex");
const jwt = require("jsonwebtoken");

const TaskController = {
  async getAllByCategoryId(request, h) {
    const { categoryid } = request.params;
    try {
      const tasks = await Task.query().where({ categoryid });

      return tasks;
    } catch (error) {
      console.log(error);
      throw Boom.unauthorized("Invalid token");
    }
  },

  async create(request, h) {
    const { name, categoryId } = request.payload;

    try {
      if (!name) {
        throw Boom.badRequest("Task name is required");
      }

      const task = await Task.query().insert({
        name,
        categoryid: categoryId,
        completed: false, // Set default value for completed field
      });

      return task;
    } catch (error) {
      console.log(error);
      throw Boom.unauthorized("Invalid token");
    }
  },

  async update(request, h) {
    const { id } = request.params;
    const { name, completed } = request.payload;

    try {
      const updatedTask = await Task.query().findById(id);

      if (!updatedTask) {
        return Boom.notFound("Task not found");
      }

      await Task.query().findById(id).patch({ name, completed });
      const task = await Task.query().findById(id);

      return task;
    } catch (error) {
      console.log(error);
      throw Boom.badRequest("Failed to update task");
    }
  },

  async delete(request, h) {
    const { id } = request.params;

    try {
      const deletedCount = await Task.query().deleteById(id);

      if (deletedCount === 0) {
        return Boom.notFound("Task not found");
      }

      return h.response({ message: "deleted successfully" }).code(200);
    } catch (error) {
      console.log(error);
      throw Boom.badRequest("Failed to delete task");
    }
  },

  async findById(request, h) {
    const { id } = request.params;

    const task = await Task.query().findById(id);

    if (!task) {
      return Boom.notFound("Task not found");
    }

    return task;
  },
};

module.exports = TaskController;
