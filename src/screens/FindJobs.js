import React, { useState } from 'react';
import './FindJobs.css';
import Sidebar from '../components/Sidebar';

const FindJobs = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const jobs = [
    {
      id: 1,
      title: 'Customer Service Representative',
      company: 'TeleCare Solutions',
      location: 'Makati City',
      posted: '2 days ago',
      tags: ['Full-time', 'PWDs', 'Senior Citizens'],
      description: 'Remote position ideal for individuals with mobility challenges. Flexible hours and comprehensive training provided.',
      type: 'remote'
    },
    {
      id: 2,
      title: 'Administrative Assistant',
      company: 'Inclusive Workspace Inc.',
      location: 'Quezon City',
      posted: '1 week ago',
      tags: ['Part-time', 'PWDs', 'Youth'],
      description: 'Entry-level position with mentorship program. Accessible office with accommodations for various disabilities.',
      type: 'office'
    },
    {
      id: 3,
      title: 'Data Entry Specialist',
      company: 'Digital Solutions PH',
      location: 'Taguig City',
      posted: '3 days ago',
      tags: ['Work from Home', 'PWDs', 'Senior Citizens', 'Rural Communities'],
      description: 'Work remotely with flexible hours. Training provided for all technical skills required.',
      type: 'remote'
    },
    {
      id: 4,
      title: 'Community Coordinator',
      company: 'Bayanihan Foundation',
      location: 'Cebu City',
      posted: '5 days ago',
      tags: ['Full-time', 'Youth', 'Indigenous Peoples'],
      description: 'Engage with local communities to develop sustainable livelihood programs. Transportation allowance provided.',
      type: 'field'
    }
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterToggle = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => job.tags.includes(filter));
    
    return matchesSearch && matchesFilters;
  });

  const handleViewDetails = (jobId) => {
    console.log('View details for job:', jobId);
    // In a real app, this would navigate to job details page
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="find-jobs">
      {/* Header */}
      <header className="jobs-header">
        <h1 className="header-title" onClick={() => onNavigate('home')}>WorkLink PH</h1>
        <button className="menu-button" onClick={toggleSidebar}>
          ☰
        </button>
      </header>

      {/* Title */}
      <div className="jobs-title-section">
        <h2>Find Inclusive Job Opportunities 👤</h2>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search jobs, companies, or locations..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <button className="filter-button">
          🔽 Filter Jobs
        </button>
      </div>

      {/* Job Count and Location */}
      <div className="jobs-info">
        <span className="job-count">{filteredJobs.length} jobs found</span>
        <span className="location">📍 Philippines</span>
      </div>

      {/* Job Listings */}
      <div className="jobs-list">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h3 className="job-title">{job.title}</h3>
              <div className="job-meta">
                <span className="job-company">{job.company}</span>
                <span className="job-location">{job.location}</span>
                <span className="job-posted">Posted {job.posted}</span>
              </div>
            </div>
            
            <div className="job-tags">
              {job.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className={`job-tag ${selectedFilters.includes(tag) ? 'selected' : ''}`}
                  onClick={() => handleFilterToggle(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="job-description">{job.description}</p>
            
            <button 
              className="view-details-button"
              onClick={() => handleViewDetails(job.id)}
            >
              View Details 🔗
            </button>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="no-jobs">
          <p>No jobs found matching your criteria.</p>
          <button onClick={() => {setSearchTerm(''); setSelectedFilters([]);}}>
          Clear Filters
        </button>
      </div>
      )}

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar} 
        onNavigate={onNavigate}
        currentScreen="findjobs"
      />
    </div>
  );
};

export default FindJobs;
