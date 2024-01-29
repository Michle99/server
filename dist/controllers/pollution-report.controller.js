var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PollutionReportModel from '../models/pollution-report.model';
export const submitPollutionReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location, title, description, type, images } = req.body;
        // Create a new pollution report
        const newReport = new PollutionReportModel({
            location,
            title,
            description,
            type,
            images,
        });
        // Save the report to the database
        const savedReport = yield newReport.save();
        res.status(201).json(savedReport);
    }
    catch (error) {
        console.error('Error submitting pollution report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export const getAllPollutionReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all pollution reports from the database
        const reports = yield PollutionReportModel.find();
        res.status(200).json(reports);
    }
    catch (error) {
        console.error('Error fetching pollution reports:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// get location coordinates from reports
export const getLocationCoordinates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield PollutionReportModel.find({}, 'location');
        const coordinates = reports.map((report) => report.location.coordinates);
        res.json(coordinates);
    }
    catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export const updatePollutionReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportId = req.params.id;
        const updateData = req.body;
        // Find the pollution report by ID and update it
        const updatedReport = yield PollutionReportModel.findByIdAndUpdate(reportId, updateData, { new: true });
        if (!updatedReport) {
            res.status(404).json({ error: 'Pollution report not found' });
            return;
        }
        res.status(200).json({
            message: 'Pollution report updated successfully',
            report: updatedReport
        });
    }
    catch (error) {
        console.error('Error updating pollution report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export const deletePollutionReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportId = req.params.id;
        // Check if the pollution report with the specified ID exists
        const existingReport = yield PollutionReportModel.findById(reportId);
        if (!existingReport) {
            res.status(404).json({ error: 'Pollution report not found' });
            return;
        }
        // Find the pollution report by ID and remove it
        const deletedReport = yield PollutionReportModel.findByIdAndDelete(reportId);
        if (!deletedReport) {
            res.status(404).json({ error: 'Pollution report not found' });
            return;
        }
        res.status(200).json({
            message: 'Pollution report deleted successfully',
            report: deletedReport
        });
    }
    catch (error) {
        console.error('Error deleting pollution report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
