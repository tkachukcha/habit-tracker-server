const User = require('../models/User');
const usersMock = require('../mock/users.json');

module.exports = async () => {
  const users = await User.find();
  if (users.length !== usersMock.lenght) {
    await createInitialEntity(User, usersMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
