import { useNavigate } from "react-router";
import Header from "../components/Header"
import "./thankspage.css";

function ThanksPage() {

  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  }

  return (
    <>
      <Header></Header>
      <div className="thanks-page-wrapper">
        <div className="thanks-content">
          <div className="thanks-header">
            <h1 className="thanks-heading">Tack för din beställning 🎉</h1>
            <h3 className="thanks-subheading">En bekräftelse på din order skickas omgående till din e-post. Vi hoppas att du blir nöjd med ditt Lego-mästerverk, och du är välkommen åter!</h3>
            <button className="landing-btn" onClick={handleHome}>Hem</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThanksPage;