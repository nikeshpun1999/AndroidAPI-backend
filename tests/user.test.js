// use the path of your model
const User = require('../model/User');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/FoodforgoodAPI';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});

it('Testing of User Deletion', async () => {
    const status = await User.deleteOne({ "_id": "5d2442194d555f3f98613b62" });
    expect(status.ok).toBe(1);
});
it('Testing of Updating User', async () => {
    return User.findOneAndUpdate({ "_id": "5d2451c6dc233e52946015d7" }, { $set: { Fname: 'Changed' } })
        .then((uu) => {
            expect(uu.Fname).toEqual('Changed')
        })
});