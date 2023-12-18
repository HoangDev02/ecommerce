import { useLocation } from 'react-router-dom';
import NavbarAdmin from '../Components/Admin/navbarAdmin/NavbarAdmin';
import NavBar from '../Components/NavBar/NavBar';

function NavigationBar() {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return <NavbarAdmin />;
  } else {
    return <NavBar />;
  }
}
export default NavigationBar