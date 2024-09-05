import React from 'react';
import Navigation from '../components/nav/Navigation';
import Footer from '../components/footer/Footer';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';


function AboutUs() {
  return (
    <>
      <Navigation />
      <div className='main-container'>
        <video autoPlay loop muted className='video-background'>
          <source src={process.env.PUBLIC_URL + '/videos/sample.mp4'} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <Container fluid className='p-5 about-us-section'>
          <Row className='align-items-center'>
            <Col md={6}>
              <Image src={process.env.PUBLIC_URL+'/images/tea-plantation.jpg'} fluid className='custom-im-card'/>
            </Col>
            <Col md={6}>
              <Card className='custom-card-cont custom-ft-card'>
                <Card.Body>
                  <h2>About Tea Plantations in Sri Lanka</h2>
                  <p>
                    Sri Lanka, formerly known as Ceylon, is renowned for its tea plantations that produce some of the best tea in the world. The country's tea industry plays a vital role in its economy, providing employment and contributing significantly to export earnings. The lush green plantations, often situated in scenic highlands, are a sight to behold and attract numerous tourists annually.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className='spacer'></div>
        <Container fluid className='p-5 tea-types-section'>
          <Row>
            <Col md={6}>
              <Card className='custom-card-cont'>
                <Card.Body>
                  <h2>Types of Tea Plants in Sri Lanka</h2>
                  <p>
                    Sri Lanka is home to a variety of tea plants, each producing a unique flavor and aroma. The primary types include:
                    <ul>
                      <li>TRI 2025</li>
                      <li>TRI 2026</li>
                      <li>TRI 2043</li>
                    </ul>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className='custom-ft-card'>
              <Row>
                <Col xs={4}>
                  <Image src={process.env.PUBLIC_URL+'/images/PXL_20240430_053852390.jpg'} thumbnail className='custom-im-card' />
                </Col>
                <Col xs={4}>
                  <Image src={process.env.PUBLIC_URL+'/images/PXL_20240430_050109341.PORTRAIT.jpg'} thumbnail  className='custom-im-card' />
                </Col>
                <Col xs={4}>
                  <Image src={process.env.PUBLIC_URL+'/images/PXL_20240430_111952776.MP.jpg'} thumbnail className='custom-im-card' />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container fluid className='p-5 tea-types-section'>
          <Row>
            <Col md={10}>
              <Card className='custom-card-cont'>
                <Card.Body>
                  <h2>TRI 2025</h2>
                  <p>
                  2000, 3000, 5000 tea plants have been transplanted by TRI in Sri Lanka. The clone TRI 2025 belongs to the TRI 2000 strain. The most distinctive feature to distinguish this species from other species is its leaf shape. Its leaf gets a very good round shape. And the leaf takes a round edged form. This clone is suitable for cultivation in all provinces of Sri Lanka and its special feature is its resistance to drought. Although the growth rate of the plant is slow in the beginning, this plant is able to give a very good fruit after two years. Because this clone is less affected by diseases, cultivation can be done very easily, minimizing the difficulties in cultivation.`
                  
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className='custom-ft-card'>
              <Row>
                <Col >
                  <Image src={process.env.PUBLIC_URL+'/images/PXL_20240430_053852390.jpg'} thumbnail className='custom-im-card' />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container fluid className='p-5 tea-types-section'>
          <Row>
            <Col md={10}>
              <Card className='custom-card-cont'>
                <Card.Body>
                  <h2>TRI 2026</h2>
                  <p>
                  2000, 3000, 5000 tea plants have been transplanted by TRI in Sri Lanka. The clone TRI 2026 belongs to the TRI 2000 strain.The most distinguishing characteristic of this clone is its leaf shape.Considering its leaf, the shape is thin and oblong. And the edge of the leaf is wavy. It is suitable for areas such as the lowlands of Sri Lanka, but does not tolerate dry climates. Although the growth rate of the plant is very fast, the durability of this plant is very low. Also, due to the high impact of diseases, care should be taken during cultivation. After two years of planting this clone, it will be possible to get a very good yield of leaves.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className='custom-ft-card'>
              <Row>
                <Col >
                  <Image src={process.env.PUBLIC_URL+'/images/PXL_20240430_050109341.PORTRAIT.jpg'} thumbnail className='custom-im-card' />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container fluid className='p-5 tea-types-section'>
          <Row>
            <Col md={10}>
              <Card className='custom-card-cont'>
                <Card.Body>
                  <h2>TRI 2043</h2>
                  <p>
                  2000, 3000, 5000 tea plants have been transplanted by TRI in Sri Lanka. The clone TRI 2043 belongs to the TRI 2000 strain.The most distinguishing characteristic of this clone is the nature of its leaves.Considering its leaf, its leaf shape is slightly elongated.  Its most special feature is that the leaf acquires a purple color. This clone is suitable for growing in any part of Sri Lanka and the ability to grow even in a windy environment is a unique feature of this clone. It is a clone of tea plants that can be cultivated very successfully because the possibility of suffering from diseases is very minimal.This clone bears the alias "China Tea" and is used to produce "Silver Tips" tea leaves.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2} className='custom-ft-card'>
              <Row>
                <Col >
                  <Image src={process.env.PUBLIC_URL+'/images/PXL_20240430_111952776.MP.jpg'} thumbnail className='custom-im-card' />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <div className='spacer'></div>
        <Container fluid className='p-5 vision-section'>
          <Row>
            <Col>
              <Card className='custom-card-cont'>
                <Card.Body>
                  <h2>Vision and Future Expectations</h2>
                  <p>
                    Our vision is to sustainably grow and process tea while preserving the natural environment and improving the livelihoods of those who work in the tea industry. We aim to innovate and adapt to changing market demands, ensuring that Sri Lankan tea remains a globally recognized and cherished product.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
