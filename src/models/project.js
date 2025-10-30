const crypto = require('crypto');

// In-memory storage (replace with database in production)
let projects = [];
let nextId = 1;

class Project {
 constructor(data) {
 this.id = data.id || nextId++;
 this.name = data.name;
 this.description = data.description || null;
 this.tags = Array.isArray(data.tags) ? data.tags : [];
 this.status = data.status || 'active';
 this.createdAt = data.createdAt || new Date().toISOString();
 this.updatedAt = data.updatedAt || new Date().toISOString();
 this.hash = this.generateHash();
 }

 generateHash() {
 const content = `${this.name}${this.description}${this.createdAt}`;
 return crypto.createHash('sha256').update(content).digest('hex').substring(0, 8);
 }

 toJSON() {
 return {
 id: this.id,
 name: this.name,
 description: this.description,
 tags: this.tags,
 status: this.status,
 createdAt: this.createdAt,
 updatedAt: this.updatedAt,
 hash: this.hash
 };
 }

 static async getAll(options = {}) {
 try {
 const { page = 1, limit = 10, search } = options;
 let filteredProjects = [...projects];

 // Apply search filter
 if (search) {
 const searchTerm = search.toLowerCase();
 filteredProjects = filteredProjects.filter(project => 
 project.name.toLowerCase().includes(searchTerm) ||
 (project.description && project.description.toLowerCase().includes(searchTerm)) ||
 project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
 );
 }

 // Sort by creation date (newest first)
 filteredProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

 const total = filteredProjects.length;
 const startIndex = (page - 1) * limit;
 const endIndex = startIndex + limit;
 
 const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

 return {
 data: paginatedProjects.map(p => p.toJSON()),
 total
 };
 } catch (error) {
 throw new Error(`Failed to fetch projects: ${error.message}`);
 }
 }

 static async getById(id) {
 try {
 const project = projects.find(p => p.id === id);
 return project ? project.toJSON() : null;
 } catch (error) {
 throw new Error(`Failed to fetch project: ${error.message}`);
 }
 }

 static async create(data) {
 try {
 // Check for duplicate names
 const existingProject = projects.find(p => p.name.toLowerCase() === data.name.toLowerCase());
 if (existingProject) {
 throw new Error(`Project with name '${data.name}' already exists`);
 }

 const project = new Project(data);
 projects.push(project);
 
 return project.toJSON();
 } catch (error) {
 throw new Error(`Failed to create project: ${error.message}`);
 }
 }

 static async update(id, data) {
 try {
 const projectIndex = projects.findIndex(p => p.id === id);
 
 if (projectIndex === -1) {
 return null;
 }

 // Check for duplicate names (excluding current project)
 const existingProject = projects.find(p => 
 p.id !== id && p.name.toLowerCase() === data.name.toLowerCase()
 );
 
 if (existingProject) {
 throw new Error(`Project with name '${data.name}' already exists`);
 }

 const currentProject = projects[projectIndex];
 
 // Update project data
 const updatedProject = new Project({
 ...currentProject,
 ...data,
 id: currentProject.id,
 createdAt: currentProject.createdAt,
 updatedAt: new Date().toISOString()
 });

 projects[projectIndex] = updatedProject;
 
 return updatedProject.toJSON();
 } catch (error) {
 throw new Error(`Failed to update project: ${error.message}`);
 }
 }

 static async delete(id) {
 try {
 const projectIndex = projects.findIndex(p => p.id === id);
 
 if (projectIndex === -1) {
 return false;
 }

 projects.splice(projectIndex, 1);
 return true;
 } catch (error) {
 throw new Error(`Failed to delete project: ${error.message}`);
 }
 }

 static async getStats(id) {
 try {
 const project = projects.find(p => p.id === id);
 
 if (!project) {
 return null;
 }

 const now = new Date();
 const createdDate = new Date(project.createdAt);
 const daysSinceCreation = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));

 return {
 id: project.id,
 name: project.name,
 daysSinceCreation,
 tagCount: project.tags.length,
 status: project.status,
 hasDescription: !!project.description,
 lastUpdated: project.updatedAt,
 hash: project.hash
 };
 } catch (error) {
 throw new Error(`Failed to fetch project stats: ${error.message}`);
 }
 }

 // Utility methods for database seeding/testing
 static async seed() {
 try {
 if (projects.length > 0) {
 return false; // Already seeded
 }

 const sampleProjects = [
 {
 name: 'E-commerce Platform',
 description: 'A modern e-commerce platform built with Node.js and React',
 tags: ['javascript', 'react', 'nodejs', 'ecommerce'],
 status: 'active'
 },
 {
 name: 'Task Management API',
 description: 'RESTful API for task management with authentication',
 tags: ['api', 'nodejs', 'express', 'authentication'],
 status: 'active'
 },
 {
 name: 'Data Analytics Dashboard',
 description: 'Real-time analytics dashboard with charts and graphs',
 tags: ['dashboard', 'analytics', 'charts', 'realtime'],
 status: 'completed'
 }
 ];

 for (const projectData of sampleProjects) {
 await this.create(projectData);
 }

 return true;
 } catch (error) {
 throw new Error(`Failed to seed projects: ${error.message}`);
 }
 }

 static async clear() {
 projects = [];
 nextId = 1;
 }

 static getCount() {
 return projects.length;
 }
}

module.exports = Project;