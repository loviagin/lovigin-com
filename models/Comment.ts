import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
        index: true
    },
    author: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        website: {
            type: String,
            trim: true
        }
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
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
commentSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Index for better query performance
commentSchema.index({ postId: 1, createdAt: -1 });
commentSchema.index({ parentCommentId: 1 });

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema);
