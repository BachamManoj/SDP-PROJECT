import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; 
import Life1 from '../images/Life1.png'

export default function Footer() {
  return (
    <footer className="footer section gray-bg"  style={{textAlign:'left'}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mr-auto col-sm-6">
            <div className="widget mb-5 mb-lg-0">
              <div className="logo mb-4">
                <img src={Life1} alt="" className="img-fluid" />
              </div>
              <p>Sometimes, the enjoyment of life is accompanied by a sense of unavoidable consequence, easily understood in the light of hidden truths.</p>
              <ul className="list-inline footer-socials mt-4">
                <li className="list-inline-item">
                  <a href="https://www.facebook.com/themefisher">
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://twitter.com/themefisher">
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.pinterest.com/themefisher/">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-6">
            <div className="widget mb-5 mb-lg-0">
              <h4 className="text-capitalize mb-3">Department</h4>
              <div className="divider mb-4"></div>

              <ul className="list-unstyled footer-menu lh-35">
                <li><a href="#">Surgery</a></li>
                <li><a href="#">Women's Health</a></li>
                <li><a href="#">Radiology</a></li>
                <li><a href="#">Cardioc</a></li>
                <li><a href="#">Medicine</a></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-6">
            <div className="widget mb-5 mb-lg-0">
              <h4 className="text-capitalize mb-3">Support</h4>
              <div className="divider mb-4"></div>

              <ul className="list-unstyled footer-menu lh-35">
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Company Support</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Company Licence</a></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="widget widget-contact mb-5 mb-lg-0">
              <h4 className="text-capitalize mb-3">Get in Touch</h4>
              <div className="divider mb-4"></div>

              <div className="footer-contact-block mb-4">
                <div className="icon d-flex align-items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                  <span className="h6 mb-0">Support Available for 24/7</span>
                </div>
                <h4 className="mt-2"><a href="tel:+23-345-67890">Support@email.com</a></h4>
              </div>

              <div className="footer-contact-block">
                <div className="icon d-flex align-items-center">
                  <FontAwesomeIcon icon={faPhone} className="mr-3" />
                  <span className="h6 mb-0">Mon to Fri : 08:30 - 18:00</span>
                </div>
                <h4 className="mt-2"><a href="tel:+23-345-67890">+23-456-6588</a></h4>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-btm py-4 mt-5">
            <div className="row justify-content-center align-items-center">
                <div className="col text-center">
                <div className="copyright">
                    &copy; Copyright Reserved to Life Saviour
                </div>
                </div>
            </div>
        </div>

      </div>
    </footer>
  );
}
