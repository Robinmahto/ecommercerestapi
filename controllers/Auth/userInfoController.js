import User from '../../models/user';
import CustomErrorHandler from '../../services/CustomErrorHandler';

const userInfoController = {
   
   async me( req, res, next ){
       try{

          const user = await User.findOne({_id: req.user._id})
          
          if(!user){
              return next(CustomErrorHandler.notFound())
          }

          res.json(user)
       }catch(error){
          return next(error)
       }
   }

}

export default userInfoController;