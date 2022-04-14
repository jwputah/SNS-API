const { Schema, model } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: date,
            default: date.now(),
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        userName: {
            type: String,
            required: true
        },
        reactions: [reactionsSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;