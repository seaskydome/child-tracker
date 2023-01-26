import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button style={{ backgroundColor: "#395B64", border: "none" }} onClick={onSignUpClicked}>Sign Up</Button>
      <Button style={{ backgroundColor: "#395B64", border: "none" }} onClick={onLoginClicked}>Log in</Button>
    </>
  );
};

export default NavBarLoggedOutView;
