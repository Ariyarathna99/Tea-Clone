import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './hero.css';
import { Link, useNavigate } from 'react-router-dom';

const HeroContainer = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-container">
      
      <Container fluid>
        <Row className="align-items-center"> {/* Vertically center content */}
          <Col className="text-center custom-frame">
            <h1>Discover the Essence of Sri Lankan Tea</h1>
            <p>Experience the rich history and vibrant flavors of Sri Lankan tea. From guided plantation tours to exclusive tea tasting sessions, immerse yourself in the world of premium tea production.</p>
            <div className="button-group">
              {!localStorage.getItem('username')&&<button className="custom-button-gp primary mr-3" onClick={() => {
                navigate('/sign-in');
                window.location.reload();
              }}>Login to Account</button>}
              {localStorage.getItem('username')&&<Link to={'/image-upload'}><button className="custom-button-gp light">Idetify Tea Plants</button></Link>}
            </div>
            <br />
            <div className='image-container'>
              {/* <img src={process.env.PUBLIC_URL + '/images/tea-plantation.jpg'} alt='Tea Plantation' /> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroContainer;
