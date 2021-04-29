import React from 'react';
import Blog from './Blog/Blog';
import CompanyCertified from './CompanyCertified/CompanyCertified';
import HomeSlider from './HomeSlider/HomeSlider';
import Workflow from './Workflow/Workflow';

const Home = () => {
  return (
    <React.Fragment>
      <HomeSlider></HomeSlider>
      <CompanyCertified></CompanyCertified>
      <Workflow></Workflow>
      <Blog></Blog>
    </React.Fragment>
  );
};

export default Home;