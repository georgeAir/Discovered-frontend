import React, {Component} from 'react'
import {Container}from "react-bootstrap"

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=68c3d880825447e29248824c775e403b&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

  const BEARER_TOKEN = 'https://accounts.spotify.com/api/token'
export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
      <br/>
      <a className="btn btn-success btn-lg" href={BEARER_TOKEN}>
        bearer
      </a>
      
    </Container>

  )
}
