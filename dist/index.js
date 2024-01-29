import express from 'express';
import connectDB from './db/index';
import authRoutes from "./routes/auth.routes";
import pollutionReportRoutes from './routes/pollution-report.routes';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}));
// MongoDB Connection
connectDB();
// Auth Routes
app.use('/api/auth', authRoutes);
app.options('/api/reports/submit', cors()); // Enable preflight for /api/reports/submit
// Pollution Report Routes
app.use('/api/reports', pollutionReportRoutes);
// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
