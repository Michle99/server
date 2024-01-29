import { Request, Response } from 'express';
import PollutionReportModel, { IPollutionReport } from '../models/pollution-report.model';

export const submitPollutionReport = async (
  req: Request, 
  res: Response
  ): Promise<void> => {
  try {
    const { location, title, description, type, images }: IPollutionReport = req.body;

    // Create a new pollution report
    const newReport: IPollutionReport = new PollutionReportModel({
      location,
      title,
      description,
      type,
      images,
    });

    // Save the report to the database
    const savedReport = await newReport.save();

    res.status(201).json(savedReport);
  } catch (error) {
    console.error('Error submitting pollution report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllPollutionReports = async (
  req: Request, 
  res: Response
  ): Promise<void> => {
  try {
    // Retrieve all pollution reports from the database
    const reports = await PollutionReportModel.find();

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching pollution reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get location coordinates from reports
export const getLocationCoordinates = async (
  req: Request, 
  res: Response
  ): Promise<void> => {
  try {
    const reports = await PollutionReportModel.find({}, 'location');
    const coordinates = reports.map((report) => report.location.coordinates);
    res.json(coordinates);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

export const updatePollutionReport = async (
  req: Request, 
  res: Response
  ): Promise<void> => {
  try {
    const reportId = req.params.id;
    const updateData: IPollutionReport = req.body;

    // Find the pollution report by ID and update it
    const updatedReport = await PollutionReportModel.findByIdAndUpdate(
      reportId, updateData, { new: true }
    );

    if (!updatedReport) {
      res.status(404).json({ error: 'Pollution report not found' });
      return;
    }

    res.status(200).json({ 
      message: 'Pollution report updated successfully', 
      report: updatedReport 
    });
  } catch (error) {
    console.error('Error updating pollution report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const deletePollutionReport = async (
  req: Request, 
  res: Response
  ): Promise<void> => {
  try {
    const reportId = req.params.id;

    // Check if the pollution report with the specified ID exists
    const existingReport = await PollutionReportModel.findById(reportId);
    if (!existingReport) {
      res.status(404).json({ error: 'Pollution report not found' });
      return;
    }

    // Find the pollution report by ID and remove it
    const deletedReport = await PollutionReportModel.findByIdAndDelete(reportId);

    if (!deletedReport) {
      res.status(404).json({ error: 'Pollution report not found' });
      return;
    }

    res.status(200).json({ 
      message: 'Pollution report deleted successfully', 
      report: deletedReport 
    });
  } catch (error) {
    console.error('Error deleting pollution report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};