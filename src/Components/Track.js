import {Card,Modal,Button} from "react-bootstrap";
import {useContext,useState} from "react";
import {UserContext} from "../Context/UserContext";
import "./Track.css";



function Track()
{  
    const {userState} = useContext(UserContext);
    const {track} = userState;
    const [show, setShow] = useState(false);
    const [modal,setmodal] = useState({food:[],date:"",calories:""});


    let openmodal =({food,date,calories})=>{
        setShow(true);
       setmodal({...modal,food:food,date:date,calories});
       
    }
    const handleClose = () => setShow(false);



    return(
      <>
      <div className= " trackcon cardcontainer">
        {track.map((track,index)=>{
          return <Card key={index} onClick={()=>{openmodal(track)}}>
          <Card.Header>
              <Card.Title>Day {index+1}</Card.Title>
              <Card.Body>
                  <div className="cardcirclecon">
                  <div className="font-weight-bold text-secondary">Calories</div>
                  <div className="cardcircle ">
                      {Math.trunc((track.calories/userState.caloriesNeed)*100)} %
                  </div>
                  <div className="font-weight-bold text-secondary">Water</div>
                  <div className="cardcircle watercircle">
                      {Math.trunc((track.water/8)*100)} %
                  </div>
                  </div>
              </Card.Body>
          </Card.Header>
      </Card>
        })  
    }
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Food Added ({modal.date}) </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
              {modal.food.map((f,index)=>{
                 return <li key={index}>{f.name}, Calories:{f.calories} kcal</li>
              })}
          </ul>
          <h5>Total Calories: <span className="text-secondary">{modal.calories} kcal</span> </h5>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
}

export default Track;