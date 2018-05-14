import React, { Component } from 'react';
import * as ReactBootstrap from "react-bootstrap";

var playerBarStyle = {
  backgroundColor: '#DA70D6',
  marginTop: '20px',
};


class PlayerBar extends Component {
    render() {
        return(
            <section className="player-bar" style={playerBarStyle}>
              <ReactBootstrap.Grid>
                <ReactBootstrap.Row>
                  <ReactBootstrap.Col xs={6} md={3} id="buttons"style={playerBarStyle}>
                    <button id="previous" onClick={this.props.handlePrevClick}>
                    <span className="ion-skip-backward"></span>
                    </button>
                    <button id="play-pause" onClick={this.props.handleSongClick}>
                      <span className={this.props.isPlaying ? 'ion-pause': 'ion-play' }></span>
                    </button>
                    <button id="next" onClick ={this.props.handleNextClick}>
                      <span className="ion-skip-forward"></span>
                    </button>
                  </ReactBootstrap.Col>
                  <ReactBootstrap.Col xs={9} md={6} id="time-control" style={playerBarStyle}  >
                         
                    <input 
                    type="range" 
                    className="seek-bar" 
                    value={(this.props.currentTime / this.props.duration) || 0}
                    max="1"
                    min="0"
                    step="0.01"
                    onChange={this.props.handleTimeChange}
                    />
                    <div className="current-time">{this.props.handleFormatTime(this.props.currentTime) } </div>
                  </ReactBootstrap.Col>
                  <ReactBootstrap.Col xs={6} md={3} id="volume-control" style={playerBarStyle} >
                    <div className=" icon ion-volume-high">
                      <input
                        type="range"
                        className="seek-bar"
                        value={(this.props.currentVolume / 1 )}
                        max= "1"
                        min="0"
                        step="0.01"
                        onChange={this.props.handleVolumeChange}
                        />
                    </div>
                  </ReactBootstrap.Col>
                </ReactBootstrap.Row>
              </ReactBootstrap.Grid>
            </section>
        );
    }
}

export default PlayerBar;