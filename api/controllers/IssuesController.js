/**
 * IssuesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async getAll(req, res) {
    const result = await Issues.find({ project: req.params.projectId });
    try {
      if (result) {
        res.status(200).json({
          success: true,
          result,
          message: "Fetch all issue successfully",
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
    try {
      const {
        project,
        title,
        issueType,
        status,
        reporter,
        assignee,
        priority,
        description,
        dueDate
      } = req.body;

      const newIssue = await Issues.create({
        title: title,
        issueType: issueType,
        description: description,
        assignee: assignee,
        reporter: reporter,
        status: status,
        priority: priority,
        project: project,
        dueDate: dueDate
      }).fetch();

      return res.status(200).json({
        success: true,
        newIssue,
        message: "Create issue successfully!",
      });
    } catch (error) {
      res.serverError({ message: error, success: false });
    }
  },
  async update(req, res) {
    try {
      const {
        title,
        issueType,
        description,
        assignee,
        reporter,
        status,
        priority,
        dueDate
      } = req.body;

      let attributes = {};

      if (title) {
        attributes.title = title;
      }
      if (issueType) {
        attributes.issueType = issueType;
      }
      if (description) {
        attributes.description = description;
      }
      if (assignee) {
        attributes.assignee = assignee;
      }
      if (reporter) {
        attributes.reporter = reporter;
      }
      if (status) {
        attributes.status = status;
      }
      if (priority) {
        attributes.priority = priority;
      }
      if (dueDate) {
        attributes.dueDate = dueDate;
      }
      const result = await Issues.update({ id: req.params.id }, attributes);

      return res.status(200).json({
        success: true,
        result,
        message: "Issue Updated Successfully",
      });
    } catch (error) {
      return res.serverError({ message: error, success: false });
    }
  },
  async delete(req, res) {
    try {
      const result = await Issues.destroy({
        id: req.params.id,
      });
      return res.status(200).json({
        success: true,
        result,
        message: "Issue moved to trash!",
      });
    } catch (error) {
      res.serverError({ message: error, success: false });
    }
  },
  async search(req, res) {
    try {
      const result = await Issues.find({
        or: [{ title: { contains: req.query.q }, project: req.params.id }, { assignee: { contains: req.query.q }, project: req.params.id }],
      });
      if (result) {
        res.status(200).json({
          success: true,
          result,
          message: "Search issue successfully",
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
};
