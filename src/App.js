import React from 'react';
import MainLayout from './components/MainLayout';
import WeatherComponent from './components/WeatherComponent';

function App() {
  return (
    <MainLayout>
      <div className='d-flex justify-content-around pb-5'>
        <div>
          <WeatherComponent />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
