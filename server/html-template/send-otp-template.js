module.exports.sendOTPTemplate = (otp) => (`
  <body style="width: 100vw;height: 100vh;">
    <div style="display: flex; justify-content: center; align-items: center;background: blueviolet;">
      <h1 style="font-family: sans-serif;color: #fff;">
        TOTE<span style="color: yellowgreen;">WEB</span>
      </h1>
    </div>
    <div
      style="display: flex;justify-content: center;align-items: center;flex-direction: column;font-family: sans-serif;">
      <h4 style="text-transform: uppercase;letter-spacing: 1px;">OTP for forgot password</h4>
      <h2 style="text-align: center;letter-spacing: 4px;font-size: 40px;">${otp}</h2>
    </div>
  </body>  
`);