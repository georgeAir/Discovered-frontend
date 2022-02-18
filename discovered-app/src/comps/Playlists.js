import React, {Component} from 'react'
import NewForm from './NewForm'
import MyPlaylist from './MyPlaylist'
import Table from 'react-bootstrap/Table'
import Nav from './Nav'

const baseUrl = 'http://localhost:3001'

export default class Playlists extends Component{
  constructor(){
    super()

    this.state = {
      baseUrl: 'https://api.spotify.com/v1/',
      myPlaylist: [],
      playlists:[],
      artist: '',
      album: '',
      title: '',
      playlistToBeEdited:{},
      modelOpen: false,
    }
  }

  loginUser = (event) => {
  event.preventDefault();
  fetch(this.state.baseURL + "/users/login", {
    method: "POST",
    body: JSON.stringify({
      username: event.target.username.value,
      password: event.target.password.value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.apiKey,
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);

      this.getFavorites();
    });
};

register = (event) => {
event.preventDefault();
fetch(this.state.baseURL + "/users/signup", {
  method: "POST",
  body: JSON.stringify({
    username: event.target.username.value,
    password: event.target.password.value,
  }),
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + this.state.apiKey,
  },
})
  .then((res) => res.json())
  .then((resJson) => {
    console.log(resJson);
  });
};

  getPlaylists = () => {
  // fetch to the backend
  console.log('getting playlists');
  fetch(baseUrl + '/playlists', {
    // credentials: 'include'
  })
  .then(res => {
    if (res.status === 200) {
      return res.json()
    } else{
      return []
    }
  }).then(data => {
    console.log(data);
    this.setState({
      playlists:data
    })
  })
}

// getMyPlaylist = () => {
//   const searchURL = this.state.baseURL + "me/playlists";
//   fetch(searchURL)
//     .then((res) => res.json())
//     .then((json) =>
//       this.setState({
//         playlists: json,
//       })
//     );
// };

deletePlaylist = (id) => {
  console.log(id)
  fetch(baseUrl + '/playlists/' + id, {
    method: 'DELETE',
    // credentials: 'include'
  }).then( res => {
    console.log(res)
    // if I checked for a 200 response code
    if(res.status === 200) {
      const findIndex = this.state.playlists.findIndex(playlist => playlist._id === id)
      const copyPlaylists = [...this.state.playlists]
      copyPlaylists.splice(findIndex, 1)
      this.setState({
        playlists: copyPlaylists
      })
    }
  })
}
addPlaylist = (newPlaylist) => {
  // update state with the new playlist from the NewForm Component
  const copyPlaylists = [...this.state.playlists]
  copyPlaylists.push(newPlaylist)
  this.setState({
    playlists: copyPlaylists
  })
}

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
  this.getPlaylists()
  // this.getMyPlaylist()
}

  render(){
    console.log(this.state.playlists);
    return(
      <div>
      <Nav/>
      <MyPlaylist/>
      <div class='customDiv'>
        <h2>Custom Playlist</h2>
          <Table variant="dark" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
              </tr>
            </thead>
            <tbody>
            {this.state.playlists.map((playlist, i) => (
              <tr key={i}>
                <td>{i+1}</td>
                <td>{playlist.title}</td>
                <td>{playlist.artist}</td>
                <td>{playlist.album}</td>
                <button onClick={() => this.showEditForm(playlist)}> Edit Title </button>
                <button onClick={() => this.deletePlaylist(playlist._id)}>Delete:❌</button>
              </tr>
            ))}

            </tbody>
          </Table>
    </div>
      {
          this.state.modalOpen &&
          <form onSubmit= {this.handleSumbit}>
            <label>Title: </label>
            <input name='title' value={this.state.title} onChange={this.handleChange}/> <br/>
            <button> submit</button>
          </form>
        }
      <div>
      <h2>Add Song To Playlist</h2>
      <NewForm addPlaylist={this.addPlaylist}/>
      </div>
    </div>
    )
  }
}
