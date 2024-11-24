import React from 'react';
import Footer from './footer';
import Header from './header';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    <main style={{ padding: '1rem' }}>{children}</main>
    {/* <Footer /> */}
  </>
);

export default Layout;
