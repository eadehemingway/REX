import React, { Component } from 'react';
import { StyledHeader } from './header.style';
import { Link } from 'react-router-dom';
import axios from 'axios'
// export const Header = () => {
//   return(
   
//   <StyledHeader>  
//     <Link to="/signup"> SIGN UP</Link> 
//     <Link to="/signin"> SIGN IN </Link>
//     <Link to="/"> PROFILE </Link>
//     <Link to="/recommendations"> RECOMMENDATIONS </Link>
//     <Link to="/user/:id"> EXTERNAL PROF </Link>
//   </StyledHeader>
//   )
// };

export class Header extends Component{
state={
  value: ''
}
  componentDidMount(){
    axios.get('/api/profile')
    .then(({data})=>{
      // console.log('data',data);
     
      
    })
  }
  search = (e)=>{
    const {value} = this.state
    console.log(value)
    axios.get(`/api/search/${value}`)
    .then(({data})=>{
console.log(data);

    })
  }

  render(){
    return(
      <StyledHeader>  
         <Link to="/signup"> SIGN UP</Link> 
          <Link to="/signin"> SIGN IN </Link>
          <Link to="/"> PROFILE </Link>
           <Link to="/recommendations"> RECOMMENDATIONS </Link>
           <Link to="/user/:id"> EXTERNAL PROF </Link>
           <input type="text" onChange={(e)=> this.setState({value: e.target.value})}></input>
           <button onClick={this.search}> search</button>
         </StyledHeader>
    )
  }
}

