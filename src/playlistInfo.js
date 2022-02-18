import React, {Component} from 'react'

export default class PlaylistInfo extends Component{
  render(){
    return(
      <>
        <h1>Number: {this.props.city.name}</h1>
        <h2>title: {this.props.cuisineType}</h2>
        <h2>artist: {this.props.description}</h2>
        <h2>album: {this.props.likes}</h2>
        <h2>likes: {this.props.location}</h2>

      </>
    )
  }
}
