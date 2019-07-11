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

describe('FoodForGood User Testing', () => {
    // the code below is for inserting user
    it('Register User', () => {
        const user = {
            'Fname': 'Nikesh',
            'Mname': 'Pun',
            'Lname': 'Magar',
            'Username': 'nikesh',
            'Password': 'nikesh',
            'UserDesc': 'Cooking freak',
            'ProfilePic': 'profile1562600777129.jpg',
            'Age': '23',
            'Sex': 'Male',
            'Nationality': 'Nepali'

        };
        return User.create(user)
            .then((user_res) => {
                expect(user_res.Fname).toEqual('Nikesh');
            });
    });
});