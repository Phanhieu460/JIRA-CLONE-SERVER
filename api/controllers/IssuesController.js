/**
 * IssuesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async getAll(req, res) {
    const allIssue =await Issues.find({})
    try {
        if (allIssue) {
            res.status(200).json({
                success: true,
                allIssue,
                message: "Fetch all issue successfully"
            })
        } else {
            res.status(401).json({
                success: false,
                data: null,
                message:'Error'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server"
        })
    }
  },
  async create(req, res) {
    try {
      let params = req.allParams();

      const newIssue = await Issues.create({
        title: params.title,
        issueType: params.issueType,
        description: params.description,
        assignee: params.assignee,
        reporter: params.reporter,
        status: params.status,
      }).fetch();

      return res.status(200).json({
        newIssue,
        message: "Create issue successfully!",
      });
    } catch (error) {
      res.serverError({ message: error });
    }
  },
  async update(req, res) {
    try {
      const { title, issueType, description, assignee, reporter, status } =
        req.body;

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
        attributes.status = status
      }
      const result = await Issues.update({ id: req.params.id }, attributes);

      return res.status(200).json({
        result,
        message: "Issue Updated Successfully",
      });
    } catch (error) {
      return res.serverError({ message: error });
    }
  },
  async delete(req, res) {
    try {
      const result = await Issues.destroy({
        id: req.params.id,
      });
      return res.status(200).json({
        result,
        message: "Issue moved to trash!",
      });
    } catch (error) {
      res.serverError({ message: error });
    }
  },
};
