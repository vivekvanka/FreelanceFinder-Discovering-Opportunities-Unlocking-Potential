import React, { useEffect, useState } from 'react';
import '../../styles/freelancer/freelancer.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Freelancer = () => {
  const navigate = useNavigate();
  const [freelancerData, setFreelancerData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState('');
  const [freelancerId, setFreelancerId] = useState('');
  const [updateSkills, setUpdateSkills] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [isDataUpdateOpen, setIsDataUpdateOpen] = useState(false);
  const [applicationsCount, setApplicationsCount] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) fetchUserData(id);
  }, []);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:6001/fetch-freelancer/${id}`);
      const data = response.data;
      setFreelancerData(data);
      setFreelancerId(data._id);
      setSkills(data.skills);
      setDescription(data.description);
      setUpdateSkills(data.skills);
      setUpdateDescription(data.description);
    } catch (err) {
      console.error("Error fetching freelancer data:", err);
    }
  };

  const updateUserData = async () => {
    try {
      await axios.post(`http://localhost:6001/update-freelancer`, {
        freelancerId,
        updateSkills,
        description: updateDescription
      });
      alert("User data updated");
      fetchUserData(freelancerId);
      setIsDataUpdateOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-applications");
      const apps = response.data.filter((app) => app.freelancerId === localStorage.getItem('userId'));
      setApplicationsCount(apps);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  return (
    freelancerData && (
      <div className="freelancer-home">
        <div className="home-cards">
          <div className="home-card">
            <h4>Current projects</h4>
            <p>{freelancerData.currentProjects.length}</p>
            <button onClick={() => navigate('/my-projects')}>View projects</button>
          </div>

          <div className="home-card">
            <h4>Completed projects</h4>
            <p>{freelancerData.completedProjects.length}</p>
            <button onClick={() => navigate('/my-projects')}>View projects</button>
          </div>

          <div className="home-card">
            <h4>Applications</h4>
            <p>{applicationsCount.length}</p>
            <button onClick={() => navigate('/myApplications')}>View Applications</button>
          </div>

          <div className="home-card">
            <h4>Funds</h4>
            <p>Available: &#8377; {freelancerData.funds}</p>
          </div>
        </div>

        <div className="freelancer-details">
          {!isDataUpdateOpen ? (
            <div className="freelancer-details-data">
              <span>
                <h4>My Skills</h4>
                <div className="skills">
                  {skills.map((skill) => (
                    <h5 className='skill' key={skill}>{skill}</h5>
                  ))}
                  {skills.length === 0 && <p>No skills available</p>}
                </div>
              </span>

              <span>
                <h4>Description</h4>
                <p>{description || "Please add your description"}</p>
              </span>

              <button className='btn btn-outline-success' onClick={() => setIsDataUpdateOpen(true)}>
                Update
              </button>
            </div>
          ) : (
            <div className="freelancer-details-update">
              <span>
                <label htmlFor="mySkills"><h4>My Skills</h4></label>
                <input
                  type="text"
                  className='form-control'
                  id='mySkills'
                  placeholder='Enter skills'
                  value={updateSkills}
                  onChange={(e) => setUpdateSkills(e.target.value)}
                />
              </span>

              <span>
                <label htmlFor="description-textarea"><h4>Description</h4></label>
                <textarea
                  className='form-control'
                  id="description-textarea"
                  placeholder='Enter your description'
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                ></textarea>
              </span>

              <button className='btn btn-outline-success mt-3' onClick={updateUserData}>Update</button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Freelancer;