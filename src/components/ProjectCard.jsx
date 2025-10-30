import React, { useState } from 'react';
import { ExternalLink, Code, Star, Eye } from 'lucide-react';

function ProjectCard({ project, featured = false }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const getTechColor = (tech) => {
    const colors = {
      'React': 'bg-blue-100 text-blue-800',
      'Vue.js': 'bg-green-100 text-green-800',
      'Angular': 'bg-red-100 text-red-800',
      'Next.js': 'bg-gray-100 text-gray-800',
      'Node.js': 'bg-green-100 text-green-700',
      'Express.js': 'bg-gray-100 text-gray-700',
      'MongoDB': 'bg-green-100 text-green-700',
      'PostgreSQL': 'bg-blue-100 text-blue-700',
      'Firebase': 'bg-orange-100 text-orange-800',
      'Tailwind CSS': 'bg-cyan-100 text-cyan-800',
      'TypeScript': 'bg-blue-100 text-blue-700',
      'JavaScript': 'bg-yellow-100 text-yellow-800'
    };
    return colors[tech] || 'bg-gray-100 text-gray-700';
  };

  return (
    <article className={`group relative bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden ${
      featured ? 'ring-2 ring-indigo-200 hover:ring-indigo-300' : ''
    }`}>
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </div>
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <Eye className="h-8 w-8 text-gray-400" />
          </div>
        )}
        {!imageError ? (
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-teal-100 flex items-center justify-center">
            <div className="text-center">
              <Eye className="h-12 w-12 text-indigo-400 mx-auto mb-2" />
              <p className="text-indigo-600 font-medium">{project.title}</p>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
        
        {/* Quick Action Buttons */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg hover:bg-indigo-50 transition-colors duration-200"
            aria-label="View live project"
          >
            <ExternalLink className="h-4 w-4 text-indigo-600" />
          </a>
          <a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
            aria-label="View source code"
          >
            <Code className="h-4 w-4 text-gray-600" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium ${getTechColor(tech)} transition-colors duration-200`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Live
          </a>
          <a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Code className="h-4 w-4 mr-2" />
            View Code
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;