import { useHistory } from "react-router-dom";

const OurProcessCard = (props) => {
  const history = useHistory()
  return (
    <div className={`elv-card processCard ${props.active?"processActiveCard":""}`}>
      <img src={props.imgSrc} alt="imgurl" />
      <h4 className="text-dark-gray">{props.title}</h4>
      <div className="notes text-gray">
        {props.content
          ? props.content
          : "Create an account on DoCity with our simple registration process and then register your property of interest through the verification form."}
      </div>
      <button className="primary-text-color" onClick={()=>{
        history.push("/ourProcess")
      }}>Know more</button>
    </div>
  );
};

export default OurProcessCard;
