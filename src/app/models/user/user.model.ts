import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";


const userSchema = new Schema<IUser, UserModel>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        validate: {
            validator: function (value: string) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
            },
            message: '{VALUE} is not a valid email',
        },

    },
    password: {
        type: String,
        required: true,
        select: 0
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: '{VALUE} is not valid, please provide a valid role',
        },
        default: 'user',
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false

    }
}, {
    timestamps: true
})



// Hash Password Using Pre hook
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
    next()
})


userSchema.post('save', async function (doc, next) {
    doc.password = '';
    next()
})

//
userSchema.statics.isUserExistsById = async function (_id: string) {
    return await User.findOne({ _id }).select('+password')
}

export const User = model<IUser, UserModel>("User", userSchema)