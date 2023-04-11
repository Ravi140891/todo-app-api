const { Model } = require("objection");
const { knex } = require("../db");
const Category = require("./Category");

class Task extends Model {
  static get tableName() {
    return "tasks";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "categoryid"],
      properties: {
        id: { type: "integer" },
        name: {
          type: "string",
          minLength: 1,
          maxLength: 255,
        },
        completed: { type: "boolean", default: false },
        categoryid: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "tasks.categoryId",
          to: "categories.id",
        },
      },
    };
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("id", "name", "completed", "categoryId");
      },
    };
  }
}

module.exports = Task;
