const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    });
    user
        .save(user)
        .then(data => res.send(data))
        .catch(err => {            res.status(500).send({
                msg:
                    err.msg || "Error while creating User"
            });
        });
};

exports.login = async (req, res)=>{    
    const userEmail = req.body.email
    const userPassword = req.body.password;    const user = await User.findOne({email:userEmail});    if(!user)  new Error("Unable to find user with email: "+userEmail);
    if(user.password !== userPassword+"") throw Error("Invalid Password");
    
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        id: user._id,
    }
    const token = jwt.sign(data, jwtSecretKey);
    res.send(token)
};

