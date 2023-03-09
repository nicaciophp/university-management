import * as mongoose from "mongoose";

const UniversitySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    domains:[ 
        {
            type: String,
            trim: true,
            required: true,
        }
    ],
    country: {
        type: String,
        trim: true,
        required: true
    },
    web_pages: [
        {
            type: String,
            trim: true,
            required: true
        }
    ],
    alpha_two_code: {
        type: String,
        trim: true,
        required: true
    },
    'state-province': {
        type: String,
        trim: true,
        required: false
    }
});

export {UniversitySchema }