import mongoose, { Schema } from 'mongoose'

const itemSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  order: {
    type: Number
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

model.findByIds = function(ids) {
  return this.find({
    '_id': {
      $in: ids.map((id) => {console.log(`'${id}'`); return mongoose.mongo.ObjectId(id);})
    }
  });
};

export const schema = model.schema
export default model
