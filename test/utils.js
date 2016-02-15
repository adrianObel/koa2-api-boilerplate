import mongoose from 'mongoose'

export function cleanDb () {
  for (const collection in mongoose.connection.collections) {
    mongoose.connection.collections[collection].remove();
  }
}
