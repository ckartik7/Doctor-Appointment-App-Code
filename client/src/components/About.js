import React from 'react'
import image from '../images/about.jpg'
import '../styles/HomeComp1.css'

const About = () => {
  return (
    <section className="hero">
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
          <h2>About Us</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam tenetur doloremque molestias repellat minus asperiores
              in aperiam dolor, quaerat praesentium. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Voluptatibus, repudiandae! Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Provident
              quibusdam doloremque ex? Officia atque ab dolore? Tempore totam
              non ea!
            </p>
          </div>
        </div>
      </section>
  )
}

export default About