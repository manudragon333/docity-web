import Team from "../assets/images/team-spirit.png";
import "./styles/landingabtus.css";
const LandingAboutUs = () => {
  return (
    <div className="landing-aboutus">
      <h1 className="text-dark-gray m2 align-center">About Us</h1>
      <div className="container d-flex mb2">
        <div>
          <div className="mt2 mb2 text-dark-gray mr2 text-justify">
            DoCity is the intelligent personal assistant for property buyers, It
            is the foremost expert on property buying best practices, DoCity is
            the best property buying consultant once can hire for the money and
            this has been made possible because it has been created smartly
            using the latest technologies in Artificial Intelligence. Deep
            Learning and Block Chain it has learnt the hard way - through
            step-by-step experince authoring of thousand of physical property
            transactions DoCity will serve as a personal assistant service to
            its users who are land and property buyer. It will reach out to
            property buyer in Hyderabad and others parts of the state and slove
            their challenges before purchasing a property in a timely manner. It
            will do this by providing the DoCity Seal (Title Insurence) for the
            property.
          </div>
          <div className="benefits">
            <h3>Benefits of Docity</h3>
            <ul>
              <li>Increased safety Transaction</li>
              <li>Reduced risk of unknowns</li>
              <li>Follow and Participate</li>
              <li>Get easy approvals for bank loans on the property</li>
              <li>Increased valuation and easily future sale.</li>
            </ul>
            <button className="primary-color">Download sample report</button>
          </div>
        </div>
        <div className="team">
          <img src={Team} alt="team" />
        </div>
      </div>
    </div>
  );
};

export default LandingAboutUs;
