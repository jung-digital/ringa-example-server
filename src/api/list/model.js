import mongoose, { Schema } from 'mongoose'
import {schema as ItemSchema} from '../item/model';

const listSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  items: [ItemSchema]
}, {
  timestamps: true
})

listSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      description: this.description,
      items: this.items,
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
