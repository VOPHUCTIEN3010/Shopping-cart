import { checkSchema } from "express-validator";
import { databaseService } from "../services/databaseServices.js";
import { hashPassword } from "../utils/crypto.js";
import { USERS_MESSAGES } from "../utils/message.js";
import  validate  from "../utils/validation.js";


export const registerValidator = validate(
    checkSchema({
        password: {
            notEmpty: { 
                errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
            },
            isLength: {
                options: { min: 8, max: 20 },
                errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_20
            },
            matches: {
                options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                errorMessage: USERS_MESSAGES.PASSWORD_FORMAT_ERROR
            }
        },
        email: {
            notEmpty: {
                errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
            },
            isEmail: {
                errorMessage: USERS_MESSAGES.EMAIL_FORMAT_ERROR
            },
            trim: true,
            custom: {
                options: async (value) => {                    
                    const existingUser = await databaseService.users.findOne({ email: value });                   
                    if(existingUser != null && existingUser) {
                        throw new Error(USERS_MESSAGES.EMAIL_EXISTS_ERROR)
                    } 
                },
            }
        }
    })
)
export const loginValidator = validate(
    checkSchema({
        email : { 
            isEmail : {
                errorMessage: USERS_MESSAGES.EMAIL_IS_NOT_VALID
            },
            trim : true,
            custom : { 
                options: async (value, { req }) => {
                    const user = await databaseService.users.findOne({email: value, password: hashPassword(req.body.password)});
                    if (!user) { 
                        throw new Error(USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT)
                    }
                    req.user = user;
                    return true;
                },
            }
        },
        password : { 
            notEmpty : {
                errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
            },
            isString : {
                errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
            },
            isLength : { 
                options: { 
                    max: 50,
                },
                errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
            },
            isStrongPassword : { 
                options : { 
                    minLength: 6, 
                    minLowercase: 1, 
                    minUppercase: 1, 
                    minNumbers: 1, 
                    minSymbols: 1,
                },
                errorMessage : USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
            },
        },
    })
)
