import React from 'react';

const TopSection = () => {
  return (
    <div className="top-section">
    <div className="cardBox">
      <div className="card">
        <div>
            <div className="numbers">1,504</div>
            <div className="cardName">Daily Views</div>
        </div>
        <div className="iconBx">
            <ion-icon name="eye-outline"></ion-icon>
        </div>
      </div>

      <div className="card">
          <div>
              <div className="numbers">80</div>
              <div className="cardName">Sales</div>
          </div>
          <div className="iconBx">
              <ion-icon name="cart-outline"></ion-icon>
          </div>
      </div>

      <div className="card">
          <div>
              <div className="numbers">284</div>
              <div className="cardName">Comments</div>
          </div>
          <div className="iconBx">
              <ion-icon name="chatbubbles-outline"></ion-icon>
          </div>
      </div>

      <div className="card">
          <div>
              <div className="numbers">$7,842</div>
              <div className="cardName">Earning</div>
          </div>
          <div className="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
          </div>
      </div>
    </div>
    </div>
  )
}

export default TopSection;
