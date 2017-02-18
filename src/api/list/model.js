import mongoose, { Schema } from 'mongoose'

const listSchema = new Schema({
  token: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  order: {
    type: Number
  },
  items: [{type: Schema.Types.ObjectId}]
}, {
  timestamps: true
})

listSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      token: this.token,
      title: this.title,
      description: this.description,
      items: this.items,
      order: this.order,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('List', listSchema)

export const schema = model.schema
export default model
