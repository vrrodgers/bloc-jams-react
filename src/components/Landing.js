import React from 'react';
import * as ReactBootstrap from "react-bootstrap";
//import { Jumbotron } from 'react-bootstrap';
//import { Button } from 'react-bootstrap';
import imgUrl from './club.png';



var divStyle = {
  backgroundPosition: 'center',
  backgroundSize: ' auto',
  webkitBackgroundSize: 'cover',
   height: '350px',
  backgroundImage: 'url(' + imgUrl + ')',
  marginTop: '60px'
};

const Landing = () => (
  <section className="landing">
    <ReactBootstrap.Jumbotron style={divStyle}>
      
    </ReactBootstrap.Jumbotron>

    <ReactBootstrap.Grid>
      <ReactBootstrap.Row>
        <ReactBootstrap.Col xs={6} md={4}>
          <div className="point">
            <span className="ion-music-note"> </span>
            <h2 className="point-title">Choose your music</h2>
            <p className="point-description">
              The world is full of music; why should you have to listen to music
              tht someone else chose?
            </p>
          </div>
        </ReactBootstrap.Col>
        <ReactBootstrap.Col xs={6} md={4}>
          <div className="point">
            <span className="ion-radio-waves"> </span>
            <h2 className="point-title">Unlimited, streaming, ad-free</h2>
            <p className="point-description">
              No arbitrary limits. No distractions
            </p>
          </div>
        </ReactBootstrap.Col>
        <ReactBootstrap.Col xs={6} md={4}>
          <div className="point">
            <span className="ion-iphone"> </span>
            <h2 className="point-title"> Mobile enabled</h2>
            <p className="point-description">Listen to your music on the go.</p>
          </div>
        </ReactBootstrap.Col>
      </ReactBootstrap.Row>
    </ReactBootstrap.Grid>
  </section>
);



export default Landing;