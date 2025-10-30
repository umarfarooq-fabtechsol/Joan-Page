const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('../routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
 windowMs: 15 * 60 * 1000, // 15 minutes
 max: 100, // limit each IP to 100 requests per windowMs
 message: 'Too many requests from this IP'
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
 res.status(200).json({ 
 status: 'OK', 
 timestamp: new Date().toISOString(),
 uptime: process.uptime()
 });
});

// 404 handler
app.use('*', (req, res) => {
 res.status(404).json({ 
 error: 'Route not found',
 path: req.originalUrl
 });
});

// Global error handler
app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(err.status || 500).json({
 error: process.env.NODE_ENV === 'production' 
 ? 'Internal server error' 
 : err.message,
 timestamp: new Date().toISOString()
 });
});

// Graceful shutdown
process.on('SIGTERM', () => {
 console.log('SIGTERM received, shutting down gracefully');
 server.close(() => {
 console.log('Process terminated');
 });
});

const server = app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
 console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;