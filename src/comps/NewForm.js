import React, {Component} from 'react'

const baseUrl = 'https://discovrd-backend.herokuapp.com'

export default class NewForm extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      artist: '',
      album:'',
    }
  }

  handleSumbit = (event) => {
    event.preventDefault()
    //fetch to the backend
    fetch(baseUrl + '/playlists', {
      method: 'Post',
      body: JSON.stringify({
        title: this.state.title,
        artist: this.state.artist,
        album: this.state.album}),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      return res.json()
    }).then( data => {
      // console.log(data);
      this.props.addPlaylist(data)
      this.setState({
        title: '',
        artist: '',
        album:'',
      })
    })
  }

  handleChange = (event) => {
    // console.log(event.target.value);
    this.setState({
      [event.target.id]: event.target.value,
    })
  }


  render(){
    console.log(this.state.title);
    return(
      <form class="newForm" onSubmit= {this.handleSumbit}>
        <label html='name'>Title: </label>
        <input type='text' id='title' name='title' onChange={(event) => this.handleChange(event)} value={this.state.title}/>
        <input type='submit' value='Title of Song'/> <br/>

        <label html='artist'>Artist: </label>
        <input type='text' id='artist' name='artist' onChange={(event) => this.handleChange(event)} value={this.state.artist}/>
        <input type='submit' value='Name of Artist'/> <br/>

        <label html='album'>Album: </label>
        <input type='text' id='album' name='album' onChange={(event) => this.handleChange(event)} value={this.state.album}/>
        <input type='submit' value='Name of Album'/>
      </form>
    )
  }
}
