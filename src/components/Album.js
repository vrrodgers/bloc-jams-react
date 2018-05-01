import React, { Component } from 'react';
import albumData from './../data/albums';
class Album extends Component {
    constructor(props){
        super(props);
        const album = albumData.find(album =>{
            return album.slug === this.props.match.params.slug
        });
        this.state = {
            album: album
        };

      
    }
  render() {
    return <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody className="song-list">
            
                {this.state.album.songs.map((album, index) =>
                    <div key={index}> 
                    <div>{index + 1} </div> 
                    <div> {album.index}</div> 
                    <div>{album.title}</div> 
                    <div>{album.duration}seconds</div>
                </div>
                
                )
             }
            
          </tbody>
        </table>
      </section>;
  }

}
    

export default Album;