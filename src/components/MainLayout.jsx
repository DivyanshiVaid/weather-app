import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  // handled the layout with header and footer
  return (
    <div>
      <Navbar />
      <main style={{ marginBottom: "5%" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
