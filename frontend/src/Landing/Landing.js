import MedMinderLogo from "../Assests/MedMinderLogo.jpg";
import AddMed2 from "../Assests/AddMed2.jpg";
import EditMed2 from "../Assests/EditMed2.jpg";
import WeeklyMeds2 from "../Assests/WeeklyMeds2.jpg";
import { Link } from "react-router-dom";
import "../Landing/Landing.css";

const Landing = function () {
  return (
    <div className="landingContainer">
      <div className="container" style={{ background: "#ffd230" }}>
        <br></br>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col"></div>
          <div className="col-7">
            <br/><br/><br/><br/><br/><br/><br/>
            <h1 className="h1">Virtual Prescription Organization</h1>
            <p className="p1">
              Manage your medication with precision and ease by using MediMind.
            </p>
            <br/>
            <Link to="/register" className="signUpButton">
              <h3>Sign Up!</h3>
            </Link>
          </div>
          <div className="col-2">
            <img src={MedMinderLogo} alt="MediMindLogo" />
          </div>
          <div className="col"></div>
        </div>

        <div className="row-6">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1 className="h3">Our Mission</h1>
          <br></br>
          <br></br>
          <p className="p2">
            Our goal is to create a web-based pill organizer. In the interest of
            promoting public health and wellness, this program will help users
            organize & keep track of their medications and supplements.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row-6">
          <br></br>
          <br></br>
          <h1 className="h3">How It Works</h1>
          <br></br>
        </div>

        <div className="card-group">
          <div className="card landing-card">
            <img
              className="card-img-top rounded"
              src={AddMed2}
              alt="Add medication screenshot"
            />
            <div className="card-body">
              <h5 className="card-title landing-card-title">Add medication</h5>
              <p className="card-text landing-card-text">
                Input the name of your medication information.
              </p>
            </div>
          </div>
          <div className="card landing-card">
            <img
              className="card-img-top rounded"
              src={EditMed2}
              alt="Edit medication screenshot"
            />
            <div className="card-body">
              <h5 className="card-title landing-card-title">Edit medication</h5>
              <p className="card-text landing-card-text">
                Make changes to your medications.
              </p>
            </div>
          </div>
          <div className="card landing-card">
            <img
              className="card-img-top rounded"
              src={WeeklyMeds2}
              alt="Weekly medication screenshot"
            />
            <div className="card-body">
              <h5 className="card-title landing-card-title">Get info</h5>
              <p className="card-text landing-card-text landing-card-title">
                Check out your daily medications from the dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ background: "#ffd230" }}>
        <br/><br/><br/><br/><br/>
      </div>

     
    </div>
  );
};

export default Landing;
