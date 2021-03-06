import Joi from 'joi'
import User from '../../models/user';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import jwtService from '../../services/jwtService';

const loginController = {
    
     async login(req, res, next){
        
        // validation
        const loginSchema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
        });

        const { error } = loginSchema.validate(req.body);

        if(error){
            return next(error)
        }
        
        // check email exists in database
        try{
            const user = await User.findOne({email: req.body.email});

            if(!user){
                return next(
                  CustomErrorHandler.wrongCredentials("Wrong Credentials")
                );
            }

            // compare password
            const match = await bcrypt.compare(req.body.password, user.password);

            if(!match){
                return next(
                  CustomErrorHandler.wrongCredentials("Wrong Credentials")
                );
            }

            // Token generate
            const access_token = jwtService.sign({_id:user._id, role: user.role})

            res.json({"access_token": access_token, "message":"login success"})

        }catch(error){
           return next(error)
        }

     }

}


export default loginController;