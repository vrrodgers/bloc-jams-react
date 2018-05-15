import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import * as ReactBootstrap from "react-bootstrap";
import  '../App.css';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug;
    });
    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 1,
      VolumePercent: 0.08,
      isPlaying: false,
      isHovered: false
    };

    function formatTime(timeInSeconds) {
      if (typeof timeInSeconds === "number") {
        const minutes = Math.floor(timeInSeconds / 60).toString();
        const seconds = Math.floor(timeInSeconds % 60).toString();

        if (seconds < 10) {
          return minutes + ":0" + seconds;
        } else {
          return minutes + ":" + seconds;
        }
      }
    }

    this.audioElement = document.createElement("audio");
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = this.state.currentVolume;
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ currentVolume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener(
      "timeupdate",
      this.eventListeners.timeupdate
    );
    this.audioElement.addEventListener(
      "durationchange",
      this.eventListeners.durationchange
    );
    this.audioElement.addEventListener(
      "volumechange",
      this.eventListeners.volumechange
    );
  }
  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener(
      "timeupdate",
      this.eventListeners.timeupdate
    );
    this.audioElement.removeEventListener(
      "durationchange",
      this.eventListeners.durationchange
    );
    this.audioElement.removeEventListener(
      "volumechange",
      this.eventListeners.volumechange
    );
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }
  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  onMouseOver(index) {
    this.setState({
      isHovering: true,
      hoveredIndex: index
    });
  }

  onMouseLeave() {
    this.setState({
      isHovering: false
    });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }
  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.max(0, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }
  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.currentVolume = newVolume;
    this.setState({ currentVolume: newVolume });
  }
  handleFormatTime(time) {
    if (typeof time === "number") {
      const minutes = Math.floor(time / 60).toString();
      const seconds = Math.floor(time % 60).toString();

      if (seconds < 10) {
        return minutes + ":0" + seconds;
      } else {
        return minutes + ":" + seconds;
      }
    }
  }

  handleHover(index) {
    this.setState({
      isHovered: !this.state.isHovered,
      hoveredIndex: index
    });
  }

  formatTime(time) {
    if (isNaN(time)) {
      return "-:--";
    } else {
      let minutes = Math.floor(time / 60);
      let seconds = Math.floor(time % 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      let formattedTime = String(minutes) + ":" + String(seconds);
      return formattedTime;
    }
  }

  render() {
    const btnClass = this.state.isHovered ? "ion-play" : "";

    return <section className="album">
        <section id="album-info">
          <ReactBootstrap.Grid>
            <ReactBootstrap.Row>
              <ReactBootstrap.Col md={4}>
                <img id="album-cover-art" src={this.state.album.albumCover} />
              </ReactBootstrap.Col>
              <ReactBootstrap.Col md={2} />
              <ReactBootstrap.Col md={4}>
                <div className="album-details">
                  <h1 id="album-title">{this.state.album.title}</h1>
                  <h2 className="artist">{this.state.album.artist}</h2>
                  <div id="release-info">
                    {this.state.album.releaseInfo}
                  </div>
                </div>
              </ReactBootstrap.Col>
              <ReactBootstrap.Col md={2} />
            </ReactBootstrap.Row>
          </ReactBootstrap.Grid>
        </section>
        <ReactBootstrap.Table responsive table id="song-list">
          <thead>
            <tr>
              <th id="song-number-column" />
              <th id="song-title-column" />
              <th id="song-title-column" />
              <th id="song-duration-column" />
            </tr>
          </thead>
          <tbody>
            {this.state.album.songs.map((song, index) => (
              <tr
                className="song"
                key={index}
                onClick={() => this.handleSongClick(song)}
                onMouseOver={() => this.onMouseOver(index + 1)}
                onMouseLeave={() => this.onMouseLeave()}
              >
                <td className="song-actions">
                  <button
                    className={btnClass}
                    key={index}
                    onMouseOver={() => this.onMouseOver(index + 1)}
                    onMouseEnter={this.handleHover.bind(this)}
                    onMouseLeave={this.handleHover.bind(this)} 
                  >
                    <span className="song-number">{index + 1}</span>
                  </button>
                </td>
                <td className="song-title">{song.title}</td>
                <td className="song-duration">
                  {this.formatTime(song.duration)}
                </td>
              </tr>
            ))}
          </tbody>
        </ReactBootstrap.Table>

        <PlayerBar isPlaying={this.state.isPlaying} currentSong={this.state.currentSong} currentTime={this.audioElement.currentTime} duration={this.audioElement.duration} currentVolume={this.state.currentVolume} volumePercent={this.state.VolumePercent} handleSongClick={() => this.handleSongClick(this.state.currentSong)} handlePrevClick={() => this.handlePrevClick()} handleNextClick={() => this.handleNextClick()} handleTimeChange={e => this.handleTimeChange(e)} handleVolumeChange={e => this.handleVolumeChange(e)} handleFormatTime={e => this.handleFormatTime(e)} />
      </section>;
  }
}
    

export default Album;