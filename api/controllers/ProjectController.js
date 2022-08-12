/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  async create(req, res) {
    const {name} = req.body

    const newProject = await Project.create({name}).fetch()

    return res.status(200).json({
        newProject,
        message: 'Create project successfully!'
    })
  },

  async update(req, res) {
    try {
        const {name, description, url} = req.body
        let attributes = {}

        if (name) {
            attributes.name = name
        }
        if (description) {
            attributes.description = description
        }
        if (url) {
            attributes.url = url
        }

        const result = await Project.update({id: req.params.id}, attributes)
        return res.status(200).json({
            result, 
            message: 'Updated successfully!'
        })

    } catch (error) {
        return res.serverError({message: error})
    }
  },
  async delete(req, res) {
    try {
        const result = await Project.destroy({
            id: req.params.id
        })
        return res.status(200).json({
            result, 
            message: 'Project moved to trash!'
        })
    } catch (error) {
        return res.serverError({message: error})
    }
  },
};

