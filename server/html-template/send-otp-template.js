module.exports.sendOTPTemplate = (otp, title) => (`
  <body style="width: 100%;">
  <div style="background: blueviolet; text-align: center;">
    <h1 style="font-family: sans-serif;color: #fff;">
      TOTE<span style="color: yellowgreen;">WEB</span>
    </h1>
  </div>
  <div style="font-family: sans-serif; text-align: center">
    <h4 style="text-transform: uppercase;letter-spacing: 1px;">${title}</h4>
    <h2 style="text-align: center;letter-spacing: 4px;font-size: 40px;">${otp}</h2>
  </div>
  </body>
`);