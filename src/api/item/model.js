import mongoose, { Schema } from 'mongoose'

const itemSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true
})

itemSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Item', itemSchema)

export const schema = model.schema
export default model
