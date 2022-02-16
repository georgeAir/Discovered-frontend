import React, {Component} from 'react'

const baseUrl = 'http://localhost:3003'

export default class MyPlaylist extends Component{
  constructor(){
    super()

    this.state = {
      baseUrl: 'https://api.spotify.com/v1/',
      myPlaylist: [],
      artist: '',
      album: '',
      title: '',
      playlistToBeEdited:{},
      modelOpen: false,
    }
  }

getMyPlaylist = () => {
  const searchURL = this.state.baseUrl + "me/playlists";
  fetch(searchURL, {headers: {
    'Authorization': 'Bearer BQDjL8tdqCS1QDL9fjFprDRxepdXJ17FvzITEz72VQAimNrHcKiQaw3GzbLQBA7bvTBwbfnOBEbJXAjCYe-FZr2RqIyGX2Whg9AYi5Urfbs27wDeA-RPA9d9MQi3oSJDtgAxQCp_5gjDO5cGX8mdtpFhGWA588-MnNI2i0PG-8NqkdLD1gYpfZjuxY9-vtitiUkV-IfN6l9AHW9SnJwpYMsbSA'
  }},)
    .then((res) => res.json())
    .then((json) =>
      this.setState({
        playlists: json,
      })
    );
};


handleSumbit = (event) => {
  event.preventDefault()
  fetch(baseUrl + '/playlists/' + this.state.playlistToBeEdited._id, {
    method: 'PUT',
    body: JSON.stringify({
      title: event.target.title.value,
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    // credentials: 'include'
  }).then(res => res.json())
  .then(resJson => {
      // console.log(resJson);
      const findIndex = this.state.playlists.findIndex(playlist => playlist._id
      === resJson.data._id)
      const copyPlaylists = [...this.state.playlists]
      copyPlaylists[findIndex] = resJson.data
      this.setState({
        playlists: copyPlaylists,
        modalOpen: false
      })
  })
}

showEditForm = (playlist) => {
  console.log(playlist);
  this.setState({
    modalOpen: true,
    title: playlist.title,
    playlistToBeEdited: playlist,
  })
}

handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
    //targeting the INPUT KEY VALUE 'TITLE '
  })
}
componentDidMount(){
  this.getMyPlaylist()
}

  render(){
    console.log(this.state);
    return(
      <div>
      {this.state.myPlaylist.map((playlist, i) => {
        return (
        <ul>
          <li>Title:{playlist.title}</li>
          <li>Artist:{playlist.artist}</li>
          <li>Album:{playlist.album}</li>
        </ul>
      )
      })}
    </div>
    )
  }
}
