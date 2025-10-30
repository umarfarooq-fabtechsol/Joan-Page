const express = require('express');
const Project = require('../models/project');
const router = express.Router();

// Validation middleware
const validateProject = (req, res, next) => {
 const { name, description } = req.body;
 
 if (!name || typeof name !== 'string' || name.trim().length === 0) {
 return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
 }
 
 if (name.length > 100) {
 return res.status(400).json({ error: 'Name must be less than 100 characters' });
 }
 
 if (description && typeof description !== 'string') {
 return res.status(400).json({ error: 'Description must be a string' });
 }
 
 if (description && description.length > 1000) {
 return res.status(400).json({ error: 'Description must be less than 1000 characters' });
 }
 
 next();
};

// GET /api/projects - Get all projects
router.get('/projects', async (req, res) => {
 try {
 const { page = 1, limit = 10, search } = req.query;
 const pageNum = parseInt(page);
 const limitNum = parseInt(limit);
 
 if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
 return res.status(400).json({ error: 'Invalid pagination parameters' });
 }
 
 const projects = await Project.getAll({ 
 page: pageNum, 
 limit: limitNum, 
 search 
 });
 
 res.json({
 projects: projects.data,
 pagination: {
 page: pageNum,
 limit: limitNum,
 total: projects.total,
 pages: Math.ceil(projects.total / limitNum)
 }
 });
 } catch (error) {
 console.error('Error fetching projects:', error);
 res.status(500).json({ error: 'Failed to fetch projects' });
 }
});

// GET /api/projects/:id - Get project by ID
router.get('/projects/:id', async (req, res) => {
 try {
 const { id } = req.params;
 
 if (!id || isNaN(parseInt(id))) {
 return res.status(400).json({ error: 'Invalid project ID' });
 }
 
 const project = await Project.getById(parseInt(id));
 
 if (!project) {
 return res.status(404).json({ error: 'Project not found' });
 }
 
 res.json(project);
 } catch (error) {
 console.error('Error fetching project:', error);
 res.status(500).json({ error: 'Failed to fetch project' });
 }
});

// POST /api/projects - Create new project
router.post('/projects', validateProject, async (req, res) => {
 try {
 const { name, description, tags, status = 'active' } = req.body;
 
 const projectData = {
 name: name.trim(),
 description: description ? description.trim() : null,
 tags: Array.isArray(tags) ? tags : [],
 status
 };
 
 const project = await Project.create(projectData);
 
 res.status(201).json({
 message: 'Project created successfully',
 project
 });
 } catch (error) {
 console.error('Error creating project:', error);
 
 if (error.message.includes('already exists')) {
 return res.status(409).json({ error: error.message });
 }
 
 res.status(500).json({ error: 'Failed to create project' });
 }
});

// PUT /api/projects/:id - Update project
router.put('/projects/:id', validateProject, async (req, res) => {
 try {
 const { id } = req.params;
 
 if (!id || isNaN(parseInt(id))) {
 return res.status(400).json({ error: 'Invalid project ID' });
 }
 
 const { name, description, tags, status } = req.body;
 
 const updateData = {
 name: name.trim(),
 description: description ? description.trim() : null,
 tags: Array.isArray(tags) ? tags : [],
 status: status || 'active'
 };
 
 const project = await Project.update(parseInt(id), updateData);
 
 if (!project) {
 return res.status(404).json({ error: 'Project not found' });
 }
 
 res.json({
 message: 'Project updated successfully',
 project
 });
 } catch (error) {
 console.error('Error updating project:', error);
 res.status(500).json({ error: 'Failed to update project' });
 }
});

// DELETE /api/projects/:id - Delete project
router.delete('/projects/:id', async (req, res) => {
 try {
 const { id } = req.params;
 
 if (!id || isNaN(parseInt(id))) {
 return res.status(400).json({ error: 'Invalid project ID' });
 }
 
 const deleted = await Project.delete(parseInt(id));
 
 if (!deleted) {
 return res.status(404).json({ error: 'Project not found' });
 }
 
 res.json({ message: 'Project deleted successfully' });
 } catch (error) {
 console.error('Error deleting project:', error);
 res.status(500).json({ error: 'Failed to delete project' });
 }
});

// GET /api/projects/:id/stats - Get project statistics
router.get('/projects/:id/stats', async (req, res) => {
 try {
 const { id } = req.params;
 
 if (!id || isNaN(parseInt(id))) {
 return res.status(400).json({ error: 'Invalid project ID' });
 }
 
 const stats = await Project.getStats(parseInt(id));
 
 if (!stats) {
 return res.status(404).json({ error: 'Project not found' });
 }
 
 res.json(stats);
 } catch (error) {
 console.error('Error fetching project stats:', error);
 res.status(500).json({ error: 'Failed to fetch project statistics' });
 }
});

module.exports = router;