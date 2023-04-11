const { Model } = require("objection");

class Category extends Model {
  static get tableName() {
    return "categories";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        userId: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const Task = require("./Task");

    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: "categories.id",
          to: "tasks.categoryId",
        },
      },
    };
  }
}

module.exports = Category;
