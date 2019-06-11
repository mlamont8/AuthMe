const Joi = require("@hapi/joi");
const UserModel = require("./userModel");
const Boom = require("@hapi/boom");

exports.configureRoutes = server => {
  return server.route([
    {
      method: "GET",
      path: "/users",
      handler: async (request, h) => {
        try {
          let user = await UserModel.find().exec();
          return h.response(user);
        } catch (error) {
          return h.response(error).code(500);
        }
      }
    },

    // add user
    {
      method: "POST",
      path: "/register",
      options: {
        validate: {
          payload: {
            name: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required()
          },
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        }
      },
      handler: async (request, h) => {
        const userCheck = await UserModel.find({ name: request.payload.name });
        if (userCheck.length > 1) {
          throw Boom.conflict("User Already Registered");
        } else {
          try {
            let user = new UserModel(request.payload);
            let result = await user.save();
            return h.response(result);
          } catch (error) {
            return h.response(error).code(500);
          }
        }
      }
    },

    // Retrieve user
    {
      method: "GET",
      path: "/users/{id}",
      handler: async (request, h) => {
        try {
          let user = await UserModel.findById(request.params.id).exec();
          return h.response(user);
        } catch (error) {
          throw Boom.notFound("User Not Found");
        }
      }
    },

    // Update User
    {
      method: "PUT",
      path: "/users/{id}",
      options: {
        validate: {
          payload: {
            name: Joi.string().optional(),
            email: Joi.string().optional()
          }
        }
      },
      handler: async (request, h) => {
        try {
          var user = await UserModel.findByIdAndUpdate(
            request.params.id,
            request.payload,
            { new: true }
          );
          return h.response(user);
        } catch (error) {
          return h.response(error).code(500);
        }
      }
    },

    // delete user
    {
      method: "DELETE",
      path: "/users/{id}",
      handler: async (request, h) => {
        try {
          let user = await UserModel.findByIdAndDelete(request.params.id);
          return h.response(user);
        } catch (error) {
          return h.response(error).code(500);
        }
      }
    }
  ]);
};
