function Feature() {
  return (
    <div>
      <section
        className="hero d-flex flex-column justify-content-center align-items-center"
        id="home"
      >
        <div className="bg-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto col-12">
              <div className="hero-text mt-5 text-center">
                <h1
                  className="text-white mb-4"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  Conduct Online Quiz easily
                </h1>
                <a
                  href="#feature"
                  className="start"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature" id="feature">
        <div className="container">
          <div className="row">
            <div className="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
              <h2 className="mb-3 text-white" data-aos="fade-up">
                Create a contest?
              </h2>
              <p data-aos="fade-up" data-aos-delay="200">
                Login as a creater to set up Quiz for the users.
              </p>
              <a
                style={{ color: "red" }}
                href="/create_quiz"
                className="btn bg custom-btn mt-3"
                data-aos="fade-up"
                data-aos-delay="300"
                data-toggle="modal"
                data-target="#membershipForm"
              >
                Start
              </a>
            </div>
            <div className="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
              <h2 className="mb-3 text-white" data-aos="fade-up">
                Join a contest?
              </h2>
              <p data-aos="fade-up" data-aos-delay="200">
                Login as a user to participate in a Quiz.
              </p>
              <a
                style={{ color: "red" }}
                href="/join_quiz"
                className="btn bg custom-btn mt-3"
                data-aos="fade-up"
                data-aos-delay="300"
                data-toggle="modal"
                data-target="#membershipForm"
              >
                Join
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Feature;
