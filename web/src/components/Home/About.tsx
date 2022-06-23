import kira from "../../images/kira.jpeg";

function About() {
  return (
    <div>
      <section className="about section" id="about">
        <div className="container">
          <div className="row">
            <div className="mt-lg-5 mb-lg-0 col-lg-5 col-md-10 mx-auto col-12">
              <h2 className="mb-4" data-aos="fade-up" data-aos-delay="300">
                Meet the Team
              </h2>
              <p data-aos="fade-up" data-aos-delay="400"></p>
            </div>

            <div
              className="ml-lg-auto col-lg-3 col-md-6 col-12"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div className="team-thumb">
                <img src={kira} className="img-fluid" alt="Trainer" />
                <div className="team-info d-flex flex-column">
                  <h3>Mahaveer</h3>
                  <span>Web Developer</span>
                  <ul className="social-icon mt-3">
                    <li>
                      <a href="#home" className="fa fa-github"></a>
                    </li>
                    <li>
                      <a href="#home" className="fa fa-instagram"></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="ml-auto col-lg-4 col-md-5">
              <p className="copyright-text">Copyright &copy; 2020 Quizon </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;
