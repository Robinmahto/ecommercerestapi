import CustomErrorHandler from "../services/CustomErrorHandler";
import jwtService from "../services/jwtService";

const userInfoAuth = (req, res, next) => {
    
    let authHeader = req.headers.authorization;
    console.log(authHeader)
    
    if(!authHeader){
        return next(CustomErrorHandler.unAuthorized());
    }

    const token = authHeader.split(" ")[1];

    try{
        
        const { _id, role} = jwtService.verify(token);
        const user = {_id, role};
        req.user = user;

        next();

    }catch(error){
        return next(CustomErrorHandler.unAuthorized());
    }

}

export default userInfoAuth;