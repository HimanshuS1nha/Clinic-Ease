import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: function (value) {
                return this.mobile || value;
            },
            message: "Either email or mobile number is required."
        }
    },
    mobile: {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: function (value) {
                return this.email || value;
            },
            message: "Either mobile number or email is required."
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'patient'],
        default: 'patient',
    },
});
userSchema.pre('save', function (next) {
    if (!this.email && !this.mobile) {
        return next(new Error('Either email or mobile must be provided.'));
    }
    next();
});



export default mongoose.model("User", userSchema);
