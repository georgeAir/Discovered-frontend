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
    'Authorization':'Bearer BQDW4qlVwTojmlj63fmyPNVPLavHudsUqCaEIv4UIKrhyA4i1BlUufU3lHVcFIwM3OQLbTvjQmAXcVZVLo3VvMzisKKP_LBQAKRFq_81gm9Q8n1e0JW_2E5OfEHcFebZlWDLuTnW4Ydi5h1wNyAPET23kp7j-0xSnOmZXEHiN53jX8pX3x2RGAC1fJSssItlWhFrS-On3-eAYERUmaCaIHVWrQ'
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
    'Authorization':'Bearer BQCZm1Jk6syLDU5CfKAvYiVZNItBBLHFXAyMeQqp1-bv-XFcSgoUvtEDeJl2Drt7RWMRvvF_Dt5Kcm8y1J64tfCm9y_NbPUYfMm55l064fBa39iY4NOP1gEdHVwiqOHJkt6S6i_x0U_F7_tsPRgBw89xBA2pZkTiR5KPkbfazOMvvibMIZsP-q8wcHpKHE9kJBt_kfntZGa8G5Bg2L5JX975HA'
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
