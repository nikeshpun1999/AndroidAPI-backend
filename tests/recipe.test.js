var Receipe = require('../model/Recipe');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/FoodforgoodAPI';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
// describe(' Testing of User Schema', () => {
//     it(' Testing of Adding User', () => {
//         const rec = {
//             'RecipeName': 'bb',
//         };

//         return Receipe.create(rec)
//             .then((user) => {
//                 expect(user.RecipeName).toEqual('bb');
//             });
//     });
// });
it('Testing of Recipe Deletion', async () => {
    const status = await Receipe.deleteOne({ "_id": "5d244518a7c84d392cb375ea" });
    expect(status.ok).toBe(1);
});
it('Testing of Updating Recipe', async () => {
    return Receipe.findOneAndUpdate({ "_id": "5d23b1612d6be6603c1323fd" }, { $set: { Origin: 'India' } })
        .then((uu) => {
            expect(uu.Origin).toEqual('India')
        })
});