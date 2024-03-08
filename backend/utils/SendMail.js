import sgmail from "@sendgrid/mail";

export const WelcomMail = (Toemail, subject, message) => {
  sgmail.setApiKey(process.env.SENDGRID_APIKEY);

  const msg = {
    to: Toemail,
    from: process.env.SENDGRID_MAIL,
    subject: subject,
    text: message,
    html: `<h1>${message}</h1>`,
  };
  sgmail
    .send(msg)
    .then(() => console.log("Email Sent..."))
    .catch((err) => console.log("Error Found mail not sent" + err));
};
