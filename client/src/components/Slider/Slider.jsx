import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "./Slider.module.css";

export default function Slider() {
  return (
    <React.Fragment>
      <Carousel className={styles.container}>
        <Carousel.Item>
          <img
            className={styles.img}
            src="https://a0.muscache.com/im/pictures/4ac4c808-00ab-40f4-ba02-16b750a7c631.jpg"
            alt="Uno slide"
          />
          <Carousel.Caption>
            <h3 className={styles.h3}>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={styles.img}
            src="https://www.publicdomainpictures.net/pictures/270000/velka/log-cabin-1535248320uZe.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={styles.img}
            src="https://www.publicdomainpictures.net/pictures/220000/nahled/log-cabin-1496504275kpt.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </React.Fragment>
  );
}
