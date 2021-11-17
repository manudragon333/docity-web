import Parter1 from "../assets/images/partner1.png";
import Parter2 from "../assets/images/partner2.png";
const OurPartners = () => {
  return (
    <div className="mt3">
      <div className="titleSec container">
        <h1>Our Partners</h1>
        <p>
          Bridging the gap between the real estate industry and government to
          benefit our stakeholders, the market and economy at large.
        </p>
      </div>
      <div className="flex-center partnerImgs">
        <img src={Parter1} alt="partner" />
        <img src={Parter2} alt="partner" />
      </div>
    </div>
  );
};

export default OurPartners;
