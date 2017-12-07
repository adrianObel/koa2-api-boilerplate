const User = jest.genMockFromModule('models/users').default

User.mockImplementation(function (attrs) {
  this.__attrs = attrs
})

User.prototype.save = function () {
  return Promise.resolve(this)
}

User.prototype.toJSON = function () {
  return this.__attrs
}

export default User
