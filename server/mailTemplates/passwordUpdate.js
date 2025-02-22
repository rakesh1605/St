exports.passwordUpdated = (email, name) => {
    return `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Update Confirmation</title>
          <style>
              body {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.6;
                  background-color: #f4f4f4;
                  color: #333;
              }
      
              .container {
                  max-width: 600px;
                  margin: 50px auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
      
              .logo {
                  text-align: center;
                  margin-bottom: 20px;
              }
      
              .logo img {
                  max-width: 150px;
              }
      
              .message {
                  text-align: center;
                  font-size: 20px;
                  font-weight: bold;
                  color: #333;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  color: #555;
                  line-height: 1.6;
              }
      
              .highlight {
                  font-weight: bold;
                  color: #007bff;
              }
      
              .support {
                  margin-top: 20px;
                  font-size: 14px;
                  color: #777;
                  text-align: center;
              }
      
              .support a {
                  color: #007bff;
                  text-decoration: none;
              }
      
              .support a:hover {
                  text-decoration: underline;
              }
          </style>
      </head>
      
      <body>
          <div class="container">
              <div class="logo">
                  <a href="https://studynotion-edtech-project.vercel.app">
                      <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
                  </a>
              </div>
              <div class="message">Password Update Confirmation</div>
              <div class="body">
                  <p>Hi <span class="highlight">${name}</span>,</p>
                  <p>Your password has been successfully updated for the account associated with the email: <span class="highlight">${email}</span>.</p>
                  <p>If you did not request this password change, please contact us immediately to secure your account.</p>
              </div>
              <div class="support">
                  <p>If you have any questions or need further assistance, feel free to contact us at
                      <a href="mailto:info@studynotion.com">info@studynotion.com</a>.
                  </p>
                  <p>We are here to help!</p>
              </div>
          </div>
      </body>
      
      </html>`;
  };
  