import React, { useEffect } from 'react';
import '../styles/landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usertype = localStorage.getItem("usertype");
    if (usertype === 'freelancer') {
      navigate("/freelancer");
    } else if (usertype === 'client') {
      navigate("/client");
    } else if (usertype === 'admin') {
      navigate("/admin");
    }
  }, []); // ✅ add dependency array to run only once

  return (
    <div className="landing-page">
      <div className="landing-hero">
        <div className='landing-nav'>
          <h3>SB Works</h3>
          <button onClick={() => navigate('/authenticate')}>Sign In</button>
        </div>

        <div className="landing-hero-text">
          <h1>Empower Your Journey: Elevate Your Craft on SB Works</h1>
          <p>
            Dive into a realm of endless possibilities with SB Works. Unleash your creativity, skills,
            and passion as you embark on a freelancing journey like never before. Our platform is a
            thriving marketplace where innovation meets opportunity, connecting talented freelancers
            with businesses seeking excellence.
          </p>
          <button onClick={() => navigate('/authenticate')}>Join Now</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
