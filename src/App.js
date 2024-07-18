import React from 'react';
import MainLayout from './components/MainLayout';
import WeatherComponent from './components/WeatherComponent';
import bgImage from '../src/assets/images/bgImage.jpg'

function App() {
  return (
    <MainLayout>
      <div className='d-flex justify-content-around'>
        <div className='p-3'>
          <img src={bgImage} alt="image" />
        </div>
        <div className=''>
          <WeatherComponent />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
