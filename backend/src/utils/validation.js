import { validationResult } from 'express-validator';
import { HTTP_STATUS } from '../constants/httpStatus.js';

const validate = (validation) => {
    return async (req, res, next) => {
        await validation.run(req);
        const errors = validationResult(req); 

        if (errors.isEmpty()) {
            return next(); 
        }

        const errorObject = errors.mapped(); 

        const errorMessages = [];

        for (const key in errorObject) {
            const { msg } = errorObject[key];
            errorMessages.push({ field: key, message: msg }); 
        }

        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
            errors: errorMessages, 
        });
    };
};


export default validate;
