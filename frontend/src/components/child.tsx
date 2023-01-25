import styles from "../styles/Child.module.css"
import styleUtils from "../styles/utils.module.css"
import { Child as ChildModel} from "../models/child";
import { Card } from "react-bootstrap";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md"

interface ChildProps {
  child: ChildModel,
  onDeleteChildClicked: (child: ChildModel) => void,
  className?: string,
}

// destructuring syntax in the thing
const Child = ({ child, className, onDeleteChildClicked }: ChildProps) => {

  const { name, gender, age, createdAt, updatedAt } = child;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt)
  }

  return (
    <Card className={`${styles.childCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {name}
          <MdDelete 
            className="ms-auto"
            onClick={(e) => {
              onDeleteChildClicked(child);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>
          Gender: {gender} <br/>
          Age: {age}
        </Card.Text>
        
      </Card.Body>
      <Card.Footer className="">
        {createdUpdatedText}
      </Card.Footer>
    </Card>
  )
}

export default Child;