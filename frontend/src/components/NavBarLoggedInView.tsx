import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as ChildrenApi from "../network/children_api";

interface NavBarLoggedInViewProps {
  user: User,
  onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({user, onLogoutSuccessful}: NavBarLoggedInViewProps) => {
  
  async function logout() {
    try {
      await ChildrenApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }
  
  return ( 
    <>
    <Navbar.Text className="me-2">
      Signed in as: {user.username}
    </Navbar.Text>
    <Button style={{ backgroundColor: "#395B64", border: "none"}} onClick={logout}>Log Out</Button>
    </>
  );
}

export default NavBarLoggedInView;