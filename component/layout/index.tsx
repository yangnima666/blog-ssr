import type { NextPage } from 'next';
import Footer from 'component/footer';
import NavBar from 'component/navBar';

const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
