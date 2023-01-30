import { Container } from "react-bootstrap";
import ChildrenPageLoggedInView from "../components/ChildrenPageLoggedInView";
import ChildrenPageLoggedOutView from "../components/ChildrenPageLoggedOutView";
import { User } from "../models/user";
import styles from "../styles/ChildrenPage.module.css";

interface ChildrenPageProps {
  loggedInUser: User | null,
}
const ChildrenPage = ({loggedInUser}: ChildrenPageProps ) => {
  return ( 
    <Container className={styles.childrenPage}>
      <>
        { loggedInUser 
          ? <ChildrenPageLoggedInView />
          : <ChildrenPageLoggedOutView />
        }
      </>
    </Container>
   );
}
 
export default ChildrenPage;