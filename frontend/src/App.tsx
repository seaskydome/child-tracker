import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ChildrenPageLoggedInView from "./components/ChildrenPageLoggedInView";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user";
import styles from "./styles/ChildrenPage.module.css";
import * as ChildrenApi from "./network/children_api";
import ChildrenPageLoggedOutView from "./components/ChildrenPageLoggedOutView";

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [ showSignUpModal, setShowSignUpModal ] = useState(false);
  const [ showLoginModal, setShowLoginModal ] = useState(false);

  useEffect(()=> {
    // we do this because we cant make the 
    // useEffect callback async
    async function fetchLoggedInUser() {
      try {
        const user = await ChildrenApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, [])
 
  return (
    <div>
    <NavBar 
      loggedInUser={loggedInUser}
      onLoginClicked={() => setShowLoginModal(true)}
      onSignUpClicked={() => setShowSignUpModal(true)}
      onLogoutSuccessful={() => setLoggedInUser(null)}
    /> 
    <Container className={styles.childrenPage}>

      <>
      { loggedInUser 
        ? <ChildrenPageLoggedInView />
        : <ChildrenPageLoggedOutView />
      }
      </>

      
    </Container>
    { showSignUpModal &&
        <SignUpModal 
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false)
          }}
        />
      }
    { showLoginModal &&
      <LoginModal 
        onDismiss={() => setShowLoginModal(false)}
        onLoginSuccessful={(user) => {
          setLoggedInUser(user);
          setShowLoginModal(false);
        }}
      />
    }
    </div>
  );
}

export default App;
