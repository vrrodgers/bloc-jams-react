import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import * as ReactBootstrap from "react-bootstrap";

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = { albums: albumData };
    }
    render() {
        return(
            <ReactBootstrap.Grid>
                <section className='Library'>
                    <ReactBootstrap.Row>
                        { 
                            this.state.albums.map( ( album, index) =>
                                <ReactBootstrap.Col md={6} className="pic">
                                    <Link to={`/album/${album.slug}`} key={index} >
                                    <ReactBootstrap.Thumbnail src ={album.albumCover} alt= {album.title} />
                                    <h3>{album.title}</h3>
                                    <p>{album.artist}</p>
                                    <p>{album.songs.length} songs</p>
                                    </Link>
                                </ReactBootstrap.Col>
                            )
                        }
                    </ReactBootstrap.Row>
                </section>
            </ReactBootstrap.Grid>
        );
    }
}

export default Library;