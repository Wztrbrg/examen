import { useContext, useState } from "react";
import OrderIdContext from "../context/OrderIdContext";
import { createOrder } from "../api/api";
import Header from "../components/Header";
import "./orderpage.css"
import { useNavigate } from "react-router";

function OrderPage() {

  const navigate = useNavigate();

  const { orderId } = useContext(OrderIdContext);
  const [orderDetails, setOrderDetails] = useState(
    {
      email: "",
      phone: "",
      fName: "",
      lName: "",
      adress: "",
      zip: "",
      city: "",
      orderId: "",
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createOrder(
      { 
        email: orderDetails.email, 
        phone: orderDetails.phone, 
        fName: orderDetails.fName, 
        lName: orderDetails.lName, 
        adress: orderDetails.adress, 
        zip: orderDetails.zip, 
        city: orderDetails.city, 
        orderId: orderId 
      }
    );
    navigate("/thanks");
  }

  return (
    <>
      <Header></Header>
      <div className="order-page-wrapper">
        <form  onSubmit={handleSubmit} className="order-content">
          <div className="order-details">
            <div className="order-header">
              <h1>Leveransuppgifter</h1>
              <p>Var god fyll i alla fält för att göra klart din beställning</p>
            </div>
            <div className="contact-container">
              <h2>Kontakt</h2>
              <div className="input-container">
                <label>E-postadress</label>
                <input type="email" required onChange={(e) =>
                  setOrderDetails({ ...orderDetails, email: e.target.value })}/>
              </div>
              <div className="input-container">
                <label>Telefonnummer</label>
                <input type="text" required onChange={(e) =>
                  setOrderDetails({ ...orderDetails, phone: e.target.value })}/>
              </div>
            </div>
            <div className="delivery-container">
              <h2>Leverans</h2>
              <div className="name-container">
                <div className="input-container">
                  <label>Förnamn</label>
                  <input type="text" required onChange={(e) =>
                  setOrderDetails({ ...orderDetails, fName: e.target.value })}/>
                </div>
                <div className="input-container">
                  <label>Efternamn</label>
                  <input type="text" required onChange={(e) =>
                  setOrderDetails({ ...orderDetails, lName: e.target.value })}/>
                </div>
              </div>
              <div className="input-container">
                <label>Adress</label>
                <input type="text" required onChange={(e) =>
                  setOrderDetails({ ...orderDetails, adress: e.target.value })}/>    
              </div>
              <div className="adress-container">
                <div className="input-container">
                  <label>Postkod</label>
                  <input type="text" required onChange={(e) =>
                  setOrderDetails({ ...orderDetails, zip: e.target.value })}/>    
                </div>
                <div className="input-container">
                  <label>Stad</label>
                  <input type="text" required onChange={(e) =>
                  setOrderDetails({ ...orderDetails, city: e.target.value })}/>    
                </div>
              </div>
            </div>
          </div>
          <div className="payment-details">
            <div className="payment-header">
              <h1>Betalningsalternativ</h1>
              <p>Betalningsalternativ ännu inte integrerade, vänligen återkom inom kort</p>
            </div>
          </div>
          <button type="submit" className="landing-btn">Beställ</button>
        </form>
      </div>
    </>
  )
}

export default OrderPage;