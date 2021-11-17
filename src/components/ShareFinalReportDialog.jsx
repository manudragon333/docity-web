import { useState } from "react";
import Popup from "reactjs-popup";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ShareFinalReport from "./ShareFinalReport";
import Close from "../assets/images/close.svg";

const ShareFinalReportDialog = ({ open, setOpen, loading, ...props }) => {
  const [showShare, setShowShare] = useState(false);

  return (
    <Popup
      open={open}
      closeOnDocumentClick={false}
      closeOnEscape={false}
      contentStyle={{ width: 500 }}
      overlayStyle={{
        background: "rgba(0,0,0,0.7)",
      }}
    >
      <div className="flex-center flex-col card p2">
        <div className="w100 relative">
          <div
            className="fp-close-icon"
            onClick={() => {
              setOpen(false);
            }}
          >
            <img src={Close} alt="close" />
          </div>
        </div>
        <h2>Share Documents</h2>
        <span className="text-center m1"></span>
        <div className="" style={{ display: "block" }}>
          <FacebookShareButton
            url={props.share}
            quote="Share Document"
            openShareDialogOnClick
          >
            <FacebookIcon size={50} round={true} />
          </FacebookShareButton>{" "}
          &nbsp;&nbsp;
          <LinkedinShareButton
            url={props.share}
            source={props.share}
            openShareDialogOnClick
          >
            <LinkedinIcon size={50} round={true} />
          </LinkedinShareButton>
          &nbsp;&nbsp;
          <TelegramShareButton
            url={props.share}
            title={props.share}
            openShareDialogOnClick
          >
            <TelegramIcon size={50} round={true} />
          </TelegramShareButton>
          &nbsp;&nbsp;
          <TwitterShareButton
            url={props.share}
            quote={props.share}
            openShareDialogOnClick
          >
            <TwitterIcon size={50} round={true} />
          </TwitterShareButton>
          &nbsp;&nbsp;
          <WhatsappShareButton
            url={props.share}
            quote={props.share}
            openShareDialogOnClick
          >
            <WhatsappIcon size={50} round={true} />
          </WhatsappShareButton>
          &nbsp;&nbsp;&nbsp;
          <span
            onClick={() => {
              setShowShare(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <EmailIcon size={50} round={true} />
          </span>
        </div>
        <br />
        <div className="w100 d-flex flex-center">
          <CopyToClipboard text={props.share}>
            <button
              style={{
                color: "#fff",
                backgroundColor: "#d97d55",
              }}
            >
              Copy Link
            </button>
          </CopyToClipboard>
        </div>
      </div>
      <ShareFinalReport
        open={showShare}
        setOpen={setShowShare}
        share={props.share}
      />
    </Popup>
  );
};

export default ShareFinalReportDialog;
