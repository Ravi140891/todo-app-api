const TaskController = require("./controllers/task");
const CategoryController = require("./controllers/category");
const UserController = require("./controllers/users");
const { joi } = require("./db");
const Joi = joi;

const signupValidator = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

const validator = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const routes = [
  {
    method: "POST",
    path: "/signup",
    handler: UserController.create,
    options: {
      validate: {
        payload: signupValidator,
      },
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: UserController.login,
    options: {
      validate: {
        payload: validator,
      },
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/categories",
    handler: CategoryController.findAll,
    config: { auth: false },
  },
  {
    method: "POST",
    path: "/categories",
    handler: CategoryController.create,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          name: Joi.string().min(1).max(255).required(),
        }),
      },
    },
  },
  {
    method: "PUT",
    path: "/categories/{id}",
    handler: CategoryController.update,
    options: {
      auth: false,
      validate: {
        params: Joi.object({
          id: Joi.number().integer().min(1).required(),
        }),
        payload: Joi.object({
          name: Joi.string().min(1).max(255).required(),
        }),
      },
    },
  },
  {
    method: "DELETE",
    path: "/categories/{id}",
    handler: CategoryController.delete,
    options: {
      auth: false,
      validate: {
        params: Joi.object({
          id: Joi.number().integer().min(1).required(),
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/categories/{categoryid}/tasks",
    handler: TaskController.getAllByCategoryId,
    options: {
      auth: false,
      validate: {
        params: Joi.object({
          categoryid: Joi.number().integer().min(1).required(),
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/tasks/{id}",
    handler: TaskController.findById,
    options: {
      auth: false,
      validate: {
        params: Joi.object({
          id: Joi.number().integer().min(1).required(),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/tasks",
    handler: TaskController.create,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          name: Joi.string().min(1).max(255).required(),
          categoryId: Joi.number().integer().min(1).required(),
        }),
      },
    },
  },
  {
    method: "PUT",
    path: "/tasks/{id}",
    handler: TaskController.update,
    options: {
      auth: false,
      validate: {
        params: Joi.object({
          id: Joi.number().integer().min(1).required(),
        }),
        payload: Joi.object({
          name: Joi.string().min(1).max(255).required(),
          completed: Joi.boolean().required(),
        }),
      },
    },
  },
  {
    method: "DELETE",
    path: "/tasks/{id}",
    handler: TaskController.delete,
    options: {
      auth: false,
      validate: {
        params: Joi.object({
          id: Joi.number().integer().min(1).required(),
        }),
      },
    },
  },
];

module.exports = routes;
