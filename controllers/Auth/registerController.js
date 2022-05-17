import Joi from "joi";
import {User} from '../../models';
import bcrypt from 'bcrypt';
import jwtService from '../../services/jwtService';
import CustomErrorHandler from "../../services/CustomErrorHandler";

const registerController = {

    async register(req, res, next){

        //validate the request
        const registerSchema = Joi.object({
          name: Joi.string().min(3).max(30).required(),
          email: Joi.string().email().required(),
          password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
          repeat_password: Joi.ref("password"),
        }); 

        const { error } = registerSchema.validate(req.body);

        if(error){
            return next(error)
        }

        // check if user in the database already
        try{

          const exit = await User.exists({email : req.body.email})

          if(exit){
            return next(CustomErrorHandler.alreadyExist('This Email already taken'));
          }

        }catch(err){
           return next(err)
        }
         
        const { name, email, password } = req.body;
        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);

        // prepare the model
        const user = new User({
          name,
          email,
          password: hashPassword,
        }); 

        let access_token;
        try{
          const result = await user.save();
          // Token
         access_token = jwtService.sign({_id: result._id, role: result.role});
             
        }catch(err){
          return next(err);
        }
  
        res.json({"access_token": access_token, msg : 'register successfully'})

    }

}


export default registerController;