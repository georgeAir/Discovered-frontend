import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'

const baseUrl = 'http://localhost:3001'

export default class MyPlaylist extends Component{
  constructor(){
    super()

    this.state = {
      baseUrl: 'https://api.spotify.com/v1/',
      myPlaylist: [],
      tracks:[],
      artist: '',
      album: '',
      title: '',
      playlistToBeEdited:{},
      modelOpen: false,
      availablePlaylists:false
    }
  }

getMyPlaylist = () => {
  const searchURL = this.state.baseUrl + "me/playlists";
  fetch(searchURL, {headers: {
    'Authorization':'Bearer BQDwPcxIYGZ0qKfkebzL3E6_O7MCVQXtgQj4jRjnqPk-JZhVjgi8fjyC4P7I-BDlwpTS8iZ_UYJkhGBxFE93En3VnXTYlkG8k6u4NgvAX2w6W0HX81sbDi5ffhSxjiW5VrtDNa8IEqzz-x0uYvkBjIirXYGVmXXopENpzMVoujohUqFDP1TilgtZtHNFysaVLNn9guFijZq6HnenZ-7oTeJS6g'
  }},)
    .then((res) => res.json())
    .then((json) =>
      this.setState({
        myPlaylist: json.items,
      })
    );
};

getTracks = () => {
  const searchURL = this.state.baseUrl + "playlists/1ffZgrxA1ftyJHyMpLbjzd/tracks";
  fetch(searchURL, {headers: {
    'Authorization':'Bearer BQAjXw3L-9QrlozFUPxzPaqZakmmuS3oVftF2xaVQpGAYQEiWXkilUVK1s-76nUIsLC7tqC_Ah8EjfGjctGQsH-4sG3UUbtXlVdNsSWi0YwIWwWJcTO06SiqbnLqLED83UIO1_0tC8wyqTkxlk3wf3-ivI5g8YSeypiLO3cQzkUAEP0SnIYpZKQkdrikilga8S3SttA2KKEFYCLM72XCsJPKGg'
  }},)
    .then((res) => res.json())
    .then((json) =>
      this.setState({
        tracks: json.items[0],
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
  this.getTracks()
}

  render(){
    console.log(this.state.myPlaylist);
    console.log(this.state.tracks);
    return(
      <>
      <div id='container'>
        <div class="cardDiv" id="cardDiv">
              {this.state.myPlaylist.map((playlist, i) => {
                return (
                <div class="card-group" id="cardGroup">
              <div class="card">
                <img class="card-img-top" src={`${playlist.images[0].url}`} alt="image"/>
                <div class="card-body">
                  <h5 class="card-title">{playlist.name}</h5>
                  <a class="card-text" id="cardText" href='https://api.spotify.com/v1/playlists/1ffZgrxA1ftyJHyMpLbjzd/tracks'> songs </a>
                  <p class="card-text"><small class="text-muted">tracks:{playlist.tracks.total}</small></p>
                  </div>
                </div>
              </div>
              )
            })}
        </div>
      </div>
    </>
    )
  }
}
