const User = jest.genMockFromModule('models/user').default

User.mockImplementation(function (attrs) {
  this.__attrs = attrs
})

User.prototype.save = function () {
  return Promise.resolve(this)
}

User.prototype.toJSON = function () {
  return this.__attrs
}

User.prototype.set = function (key, val) {
  this.__attrs[key] = val

  return this
}

User.prototype.destroy = function (key, val) {
  return Promise.resolve(this)
}

User.findAll = function () {
  return Promise.resolve([])
}

User.findById = function (id) {
  return Promise.resolve(new User({ id }))
}

export default User
