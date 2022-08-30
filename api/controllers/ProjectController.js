/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async getProjectById(req, res) {
    const project = await Project.findOne({ id: req.params.id });
    try {
      if (project) {
        res.status(200).json({
          success: true,
          project,
          message: "Fetch project successfully",
        });
      } else {
        res.status(401).json({
          success: false,
          data: null,
          message: "Error",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server",
      });
    }
  },
  async getAllProject(req, res) {
    const allProject = await Project.find({});
    try {
      if (allProject) {
        res.status(200).json({
          success: true,
          allProject,
          message: "Fetch all project successfully",
        });
      } else {
        res.status(401).json({
          success: false,
          data: null,
          message: "Error",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server",
      });
    }
  },
  async create(req, res) {
    const { name, description, category, url } = req.body;

    const newProject = await Project.create({ name, description, category, url }).fetch();

    return res.status(200).json({
      newProject,
      message: "Create project successfully!",
    });
  },

  async update(req, res) {
    try {
      const { name, description, url, category } = req.body;
      let attributes = {};

      if (name) {
        attributes.name = name;
      }
      if (description) {
        attributes.description = description;
      }
      if (url) {
        attributes.url = url;
      }
      if (category) {
        attributes.category = category;
      }

      const result = await Project.update({ id: req.params.id }, attributes);
      return res.status(200).json({
        result,
        message: "Updated successfully!",
      });
    } catch (error) {
      return res.serverError({ message: error });
    }
  },
  async delete(req, res) {
    try {
      const result = await Project.destroy({
        id: req.params.id,
      });
      return res.status(200).json({
        result,
        message: "Project moved to trash!",
      });
    } catch (error) {
      return res.serverError({ message: error });
    }
  },
};
