import { Container } from "react-bootstrap";
import ChildrenPageLoggedInView from "./components/ChildrenPageLoggedInView";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import styles from "./styles/ChildrenPage.module.css";

function App() {
 
  return (
    <div>
    <NavBar 
      loggedInUser={null}
      onLoginClicked={() => {}}
      onSignUpClicked={() => {}}
      onLogoutSuccessful={() => {}}
    /> 
    <Container className={styles.childrenPage}>

      <ChildrenPageLoggedInView />

      { false &&
        <SignUpModal 
          onDismiss={() => {}}
          onSignUpSuccessful={() => {}}
        />
      }
      { false &&
        <LoginModal 
          onDismiss={() => {}}
          onLoginSuccessful={() => {}}
        />
      }
    </Container></div>
  );
}

export default App;
