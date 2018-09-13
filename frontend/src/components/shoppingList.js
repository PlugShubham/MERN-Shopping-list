import React from 'react';
import axios from 'axios';
import { Jumbotron,
    Button,
    ListGroup,
    ListGroupItem,
    InputGroup, 
    InputGroupAddon,
    InputGroupText,
    Input } from 'reactstrap';

class ShoppingList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            items:[],
            item:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    componentWillMount(){
        axios
            .get('https://shopping-list-mern-plug.herokuapp.com/api')
            .then(res=>{
                this.setState({
                    items:res.data
                })
            })
    }
    
    handleChange(e){
        this.setState({
            item:e.target.value
        })
    }
    onSubmit(){
        //console.log(this.state.item);
        axios
            .post("https://shopping-list-mern-plug.herokuapp.com/api",{
                "name":this.state.item
            })
            .then(res=>console.log("data is saved"))
            .catch((err)=>console.log(err))
    }
    onDelete(e){
        const itemID  = e.target.value;
        axios
            .delete('https://shopping-list-mern-plug.herokuapp.com/api/'+itemID)
            .then((res)=>console.log(res))
            .then(()=>window.location.reload())
            .catch((err)=>console.log(err))
    }
    render(){
        //console.log(this.state.items);
        const itemList = this.state.items.map((item,key)=>{
            return <ListGroupItem key={key}>{item.name}
                <Button outline onClick={this.onDelete} value={item._id} className="right" color="danger">X</Button>
            </ListGroupItem>;
        })
        return(
            <div className="container">
                <Jumbotron>
                    
                <h1>Shopping List</h1>
                <hr />
                <ListGroup>{itemList}</ListGroup>
                <br />
                <form onSubmit={this.onSubmit}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                             Enter Item
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" 
                        name="name" 
                        value={this.state.item} 
                        onChange={this.handleChange}/>
                    </InputGroup>
                    <br />
                    <Button outline color="warning" type="submit">ADD</Button>
                </form>   
                    
                </Jumbotron> 
            </div>    
        );
    }
}
export default ShoppingList;