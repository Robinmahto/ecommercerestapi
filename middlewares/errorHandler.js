import {DEBUG_MODE} from '../config'
import {ValidationError} from 'joi'
import CustomErrorHandler from '../services/CustomErrorHandler';


const errorHandler = (err, req, res, next)=>{
     
    // Default
    let statusCode = 500;

    let data = {
        message : 'Internal server error',
        ...(DEBUG_MODE === true && {originalError : err.message})
    }
    
    // client validation Error
    if(err instanceof ValidationError){
        statusCode = 422;
        data = {
            message : err.message
        }
    }

    // custom Error
    if(err instanceof CustomErrorHandler){
        statusCode = err.status;
        data = {
            message : err.message
        }
    }




    return res.status(statusCode).json(data);
       
}


export default errorHandler;