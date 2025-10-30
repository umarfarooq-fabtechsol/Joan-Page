import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import SkeletonLoader from './SkeletonLoader';
import { Code, ExternalLink, Briefcase } from 'lucide-react';

function PortfolioSection() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock project data
  const mockProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with user authentication, payment processing, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveLink: 'https://ecommerce-demo.vercel.app',
      codeLink: 'https://github.com/user/ecommerce-platform',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team collaboration, and progress tracking.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      liveLink: 'https://taskapp-demo.netlify.app',
      codeLink: 'https://github.com/user/task-management',
      featured: false
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'OpenWeather API', 'Chart.js'],
      liveLink: 'https://weather-dash-demo.vercel.app',
      codeLink: 'https://github.com/user/weather-dashboard',
      featured: true
    },
    {
      id: 4,
      title: 'Social Media Analytics',
      description: 'Analytics dashboard for social media managers with engagement metrics, audience insights, and automated reporting.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['Angular', 'D3.js', 'Express.js'],
      liveLink: 'https://analytics-demo.herokuapp.com',
      codeLink: 'https://github.com/user/social-analytics',
      featured: false
    },
    {
      id: 5,
      title: 'Recipe Sharing Platform',
      description: 'A community-driven recipe sharing platform with user profiles, rating system, and meal planning features.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['Next.js', 'PostgreSQL', 'Prisma'],
      liveLink: 'https://recipe-share-demo.vercel.app',
      codeLink: 'https://github.com/user/recipe-platform',
      featured: true
    },
    {
      id: 6,
      title: 'Fitness Tracker',
      description: 'Personal fitness tracking application with workout logging, progress visualization, and goal setting.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['React Native', 'Redux', 'SQLite'],
      liveLink: 'https://fitness-tracker-demo.expo.dev',
      codeLink: 'https://github.com/user/fitness-tracker',
      featured: false
    }
  ];

  useEffect(() => {
    // Simulate API call with loading delay
    const timer = setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section className="portfolio-section py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Portfolio
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Check out some of my recent projects showcasing modern web development,
            user experience design, and innovative solutions.
          </p>
          <div className="mt-8 h-1 w-24 bg-gradient-to-r from-indigo-600 to-teal-500 mx-auto rounded-full"></div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-12">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-3"></div>
                <span className="text-indigo-700 font-medium">Loading amazing projects...</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          </div>
        )}

        {/* Projects Display */}
        {!isLoading && (
          <div className="space-y-16">
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div>
                <div className="flex items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mr-3">Featured Projects</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-indigo-200 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} featured={true} />
                  ))}
                </div>
              </div>
            )}

            {/* Other Projects */}
            {otherProjects.length > 0 && (
              <div>
                <div className="flex items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mr-3">Other Projects</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-teal-200 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} featured={false} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {projects.length === 0 && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Projects Yet
                  </h3>
                  <p className="text-gray-500">
                    New exciting projects are coming soon. Stay tuned!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Statistics */}
        {!isLoading && projects.length > 0 && (
          <div className="mt-20 pt-16 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600">{projects.length}</div>
                <div className="text-gray-600 mt-1">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600">
                  {[...new Set(projects.flatMap(p => p.technologies))].length}
                </div>
                <div className="text-gray-600 mt-1">Technologies Used</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">{featuredProjects.length}</div>
                <div className="text-gray-600 mt-1">Featured Works</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">100%</div>
                <div className="text-gray-600 mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PortfolioSection;