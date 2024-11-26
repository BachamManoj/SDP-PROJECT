import React from 'react';
import './Navbar.css';
import about1 from '../images/about-1.jpg';
import about2 from '../images/about-2.jpg';
import about3 from '../images/about-3.jpg';
import about4 from '../images/about-4.jpg';
import award1 from '../images/1.png';
import award2 from '../images/2.png';
import award3 from '../images/3.png';
import award4 from '../images/4.png';
import award5 from '../images/5.png';
import award6 from '../images/6.png';
import Navbar from './Navbar';

export default function About() {
  return (
    <div>
      <Navbar/>
      <section className="page-title bg-1">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <h1 className="text-capitalize mb-5 text-lg" style={{ fontSize: "4.2rem", opacity: 0.7 }}>
                  About Us
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="section about-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h2 className="title-color">Personal care for your healthy living</h2>
            </div>
            <div className="col-lg-8">
              <p>
              At <b>Life Saviour</b>, our vision is to be a trusted leader in medical care by providing cutting-edge services and holistic care that meets the evolving needs of our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="fetaure-page about-text-left">
        <div className="container ">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <img src={about1} alt="" className="img-fluid w-100" />
                <h4 className="mt-3">Healthcare for Kids</h4>
                <p>Voluptate aperiam esse possimus maxime repellendus, nihil quod accusantium.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <img src={about2} alt="" className="img-fluid w-100" />   
                <h4 className="mt-3">Medical Counseling</h4>
                <p>Voluptate aperiam esse possimus maxime repellendus, nihil quod accusantium.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <img src={about3} alt="" className="img-fluid w-100" />
                <h4 className="mt-3">Modern Equipments</h4>
                <p>Voluptate aperiam esse possimus maxime repellendus, nihil quod accusantium.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <img src={about4} alt="" className="img-fluid w-100" />
                <h4 className="mt-3">Qualified Doctors</h4>
                <p>Voluptate aperiam esse possimus maxime repellendus, nihil quod accusantium.</p>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      <section className="section  ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 ">
              <h2 className="title-color">Our Doctors achievements</h2>
              
            </div>
            <div className="col-lg-8">
              <div className="row">
                <div class="col-lg-4 col-md-6 col-sm-6">
					<div class="award-img">
                        <img src={award1} alt="" className="img-fluid w-100" />
					</div>
				</div>
                <div class="col-lg-4 col-md-6 col-sm-6">
					<div class="award-img">
                        <img src={award4} alt="" className="img-fluid w-100" />
					</div>
				</div>
                <div class="col-lg-4 col-md-6 col-sm-6">
					<div class="award-img">
                        <img src={award3} alt="" className="img-fluid w-100" />
					</div>
				</div>
                <div class="col-lg-4 col-md-6 col-sm-6">
					<div class="award-img">
                        <img src={award2} alt="" className="img-fluid w-100" />
					</div>
				</div>
                <div class="col-lg-4 col-md-6 col-sm-6">
					<div class="award-img">
                        <img src={award5} alt="" className="img-fluid w-100" />
					</div>
				</div>
                <div class="col-lg-4 col-md-6 col-sm-6">
					<div class="award-img">
                        <img src={award6} alt="" className="img-fluid w-100" />
					</div>
				</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section testimonial">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-6">
              <div className="section-title">
                <h2 className="mb-4">What they say about us</h2>
                <div className="divider my-4"></div>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 testimonial-wrap offset-lg-6">
              
              <div className="testimonial-block">
                <div className="client-info">
                  <h4>Amazing service!</h4>
                  <span>John Partho</span>
                </div>
                <p>
                They provide excellent service facilities, demonstrating outstanding professionalism. Their team is dedicated, skilled, and consistently goes above and beyond to meet our needs. Their commitment to quality is evident, and they handle everything with great care, ensuring every detail is addressed.
                </p>
                
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
