import { useState } from "react";
import {InputGroup,FormControl,Card,Modal,Button} from "react-bootstrap";
import {FaSearch} from "react-icons/fa";
import "./Recipe.css";
import axios from "axios";
import {SyncLoader} from "react-spinners";

function Recipe()
{
    const [search,Setsearch] = useState("");
    const[food,Setfood] = useState([]);
    const[load,setload] = useState(false);
    const [show, setShow] = useState(false);
    const[ing,Seting] = useState({label:"",ingredients:[],url:"#"});

    const handleClose = () => setShow(false);
    const handleShow = (ingredients,label,url) => {
        Seting({...ing,ingredients,label,url});
        setShow(true);
    }

    let getfoodDetails= async(event)=>{
        setload(true);
        event.preventDefault();
       const {data} = await axios.get(`https://api.edamam.com/api/recipes/v2?q=${search}&app_id=1c980437&app_key=087034b3f94db20a078b6dbc3fc72ca0&type=public`);
       setload(false);
        Setfood(data.hits);
      console.log(data);
    }
 

    return(
        <>
        <div className="container-fluid recipecon">
        <div className="container">
        <h1>Find recipes</h1>
        <form onSubmit={getfoodDetails}>
        <InputGroup className="searchcon" >
          <FormControl placeholder="pizza" name="search"  value={search} onChange={(event)=>{Setsearch(event.target.value)}}></FormControl>
           <FaSearch className="innerbtn searchicon" onClick={getfoodDetails} type="submit"/>
        </InputGroup>
         </form>
        </div>
        </div>
        <div className="mt-4 container cardcontainer">
            {load ? <SyncLoader/>:(
                <>
                  {food.length===0 ? <h1>No Results</h1>:(
                      food.map((x,index)=>{
                         return <Card key={index} onClick={()=>{handleShow(x.recipe ? x.recipe.ingredientLines:["null"],x.recipe? x.recipe.label:"",x.recipe? x.recipe.url:"#")}} className="card cardrecipe">
                              <Card.Body>
                                  <Card.Title>{x.recipe? x.recipe.label:""}</Card.Title>
                                  <Card.Img variant="bottom" src={x.recipe? x.recipe.image:""}></Card.Img>
                              </Card.Body>
                     
                          </Card>
                         
                      })
                  )}
                </>  
            )}
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ing.label} Ingredients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ul>
            {ing.ingredients.map((ing,index)=>{
                return <li key={index}>{ing}</li>
            })}
            </ul>
            <a href={ing.url} target="_blank" rel="noreferrer" className="btn btn-danger">More Info</a>
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
export default Recipe;