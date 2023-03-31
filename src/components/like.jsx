import React, { Component } from 'react';

class Like extends Component {
    // state = { 
    //     isLike: "fa fa-heart-o"
    //  } 
    //  likeComment = () =>{
    //     const isLike = this.state.isLike ? "fa fa-heart" : "fa fa-heart-o"
    //     this.setState({
    //         isLike
    //     })     
    //  }
     render() { 
        let classes = "fa fa-heart"
        if(!this.props.liked) classes+= "-o"
        return <i onClick={this.props.onClick} className={classes} aria-hidden="true"></i>
    }
}
 
export default Like;

