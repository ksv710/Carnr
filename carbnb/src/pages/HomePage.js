// Home Component
//
// This component renders the homepage of the CaRnR web application. It includes:
// - A banner section with a background image and call-to-action buttons.
// - An about section describing the purpose of CaRnR.
// - A services section highlighting different rental options available.
// - A testimonials section showcasing user reviews.
// - A contact section with email and social media information.
// - A footer with copyright information.
//

import React from "react";
import { Link } from "react-router-dom";
import carBanner from "../images/car-banner.jpg";
import serviceIcon1 from "../images/icon1.png";
import serviceIcon2 from "../images/icon2.png";
import serviceIcon3 from "../images/icon3.png";
import serviceIcon4 from "../images/icon4.png";
import "../components/Styles/Home.css";
import { Element } from "react-scroll";

const Home = () => {
  return (
    <div className="home-page">
      {/* Banner section with a background image and call-to-action buttons */}
      <div
        className="banner"
        style={{
          backgroundImage: `url(${carBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="banner-overlay"></div>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-md-6">
              <div className="banner-content">
                <h1 className="banner-title">Explore the World with CaRnR</h1>
                <p className="banner-text">
                  Find your perfect car rental for any occasion.
                </p>
                <Link to="/FindCars" className="btn fancy-button">
                  Rent a Car
                </Link>
                <Link to="/ListACarPage" className="btn fancy-button">
                  List a Car
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About section explaining the purpose of CaRnR */}
      <Element name="about">
        <section id="about" className="about-section">
          <div className="container">
            <h2 className="section-title1">About CaRnR</h2>
            <p className="section-text">
              CaRnR is your ultimate platform for renting cars hassle-free.
              Whether you're planning a road trip or need a special car for an
              occasion, we've got you covered. Our mission is to provide a
              seamless experience, connecting car owners with renters worldwide.
            </p>
            <p className="section-text">
              Start your journey with CaRnR today and experience the freedom of
              choice when it comes to your next ride.
            </p>
          </div>
        </section>
      </Element>

      {/* Services section highlighting the different rental options */}
      <Element name="services">
        <section id="services" className="services-section">
          <div className="container">
            <h2 className="section-title1">Our Services</h2>
            <p className="section-text">
              We offer a wide range of car rental services to meet your needs:
            </p>
            <div className="services-list">
              <div className="service-item">
                <img
                  src={serviceIcon1}
                  alt="Short-term rentals"
                  className="service-icon"
                />
                <h3>Short-term rentals</h3>
                <p>Perfect for quick trips and weekend getaways</p>
              </div>
              <div className="service-item">
                <img
                  src={serviceIcon2}
                  alt="Long-term rentals"
                  className="service-icon"
                />
                <h3>Long-term rentals</h3>
                <p>Ideal for extended vacations and long-term needs</p>
              </div>
              <div className="service-item">
                <img
                  src={serviceIcon3}
                  alt="Luxury car rentals"
                  className="service-icon"
                />
                <h3>Luxury car rentals</h3>
                <p>Experience the thrill of driving a luxury car</p>
              </div>
              <div className="service-item">
                <img
                  src={serviceIcon4}
                  alt="Corporate rentals"
                  className="service-icon"
                />
                <h3>Corporate rentals</h3>
                <p>Reliable and comfortable cars for business trips</p>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* Testimonials section featuring user reviews */}
      <Element name="testimonials">
        <section id="testimonials" className="testimonials-section">
          <div className="container">
            <h2 className="section-title1">Testimonials</h2>
            <div className="testimonials">
              <div className="testimonial">
                <p>
                  "CaRnR made our road trip unforgettable! Great service and
                  amazing cars!" - John Doe
                </p>
              </div>
              <div className="testimonial">
                <p>
                  "The best car rental experience I've ever had. Highly
                  recommend CaRnR!" - Jane Smith
                </p>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* Contact section with email and social media information */}
      <Element name="contact">
        <section id="contact" className="contact-section">
          <div className="container">
            <h2 className="contact_section-title">Contact Us</h2>
            <p className="section-text">
              Have questions or need assistance? Reach out to us at
              carnr476@gmail.com
            </p>
            <p className="section-text">
              Follow us on social media for updates and news.
            </p>
          </div>
        </section>
      </Element>

      {/* Footer with copyright information */}
      <footer className="bg-body-tertiary">
        <p className="p-3 m-0 text-center">
          &copy; {new Date().getFullYear()} CaRnR. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
