/**
 * IssuesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Issues = require("../models/Issues");

module.exports = {
  async create(req, res) {
    try {
        let params = req.allParams()

        const newIssue = await Issues.create({
            title: params.title,
            issueTask: params.issueTask,
            description: params.description,
            assignee: params.assignee,
            reporter: params.reporter,
            status: params.status
        }).fetch()

        return res.status(200).json({
            newIssue,
            message: 'Create issue successfully!'
        })
    } catch (error) {
        res.serverError({message: error})
    }
  },
  async update(req, res) {
    try {
        const {title, issueTask, description, assignee, reporter, status} = req.body

        let attributes = {}

        if (title) {
          attributes.title = title;
        }
        if (issueTask) {
            attributes.issueTask = issueTask;
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
          const result = await Issues.update({id: req.params.id}, attributes)

        return res.status(200).json({
            result,
            message: 'Issue Updated Successfully'
        })
    } catch (error) {
        return res.serverError({message: error})
    }
  }
  ,
  async delete(req, res) {
    try {
        const result = await Issues.destroy({
            id: req.params.id
        })
        return res.status(200).json({
            result,
            message: 'Issue moved to trash!'
        })
    } catch (error) {
        res.serverError({message: error})
    }
  }

};

