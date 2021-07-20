import { User } from '../models/user.model'
import passport from 'passport'

export const registerUserAPI = (req, res, next) => {
    let user = new User;
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.setPassword(req.body.password);

    user.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json("Error: " + err));
}

export const signUserInAPI = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            res.status(404).json(err)
            res.end()
        } else {
            if(user) {
                let token = user.generateJWT()
                let admin = user.generateJWT()
                res.cookie("token", token, {maxAge: 1000 * 60 * 60 * 24})
                res.end()
            } else {
                res.status(401).json(err)
                res.end()
            }
        }
    })(req, res, next)
}
