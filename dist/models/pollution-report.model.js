import mongoose, { Schema } from 'mongoose';
const pollutionReportSchema = new Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
        },
    ],
});
const PollutionReportModel = mongoose.model('PollutionReport', pollutionReportSchema);
export default PollutionReportModel;
