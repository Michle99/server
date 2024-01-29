import mongoose, { Document, Schema } from 'mongoose';

export interface IPollutionReport extends Document {
  location: {
    type: string;
    coordinates: [number, number];
  };
  title: string;
  description: string;
  type: string;
  images: string[];
}

const pollutionReportSchema: Schema<IPollutionReport> = new Schema({
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

const PollutionReportModel = mongoose.model<IPollutionReport>('PollutionReport', pollutionReportSchema);

export default PollutionReportModel;
