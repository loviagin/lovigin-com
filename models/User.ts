import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        street: String,
        city: String,
        country: String,
        postalCode: String
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    chats: [{
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        messages: [{
            sender: {
                type: String,
                enum: ['user', 'manager']
            },
            content: String,
            timestamp: {
                type: Date,
                default: Date.now
            }
        }],
        lastUpdated: {
            type: Date,
            default: Date.now
        }
    }],
    role: {
        type: String,
        enum: ['user', 'manager', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.models.User || mongoose.model('User', userSchema); 