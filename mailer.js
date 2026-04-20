import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendDownloadLink(email, token) {
  const downloadUrl = `${process.env.BASE_URL}/download/${token}`;
  const leadMagnetTitle = process.env.LEAD_MAGNET_TITLE || 'Your Free Guide';

  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: `Here's your download — ${leadMagnetTitle}`,
    html: `<html><body style="background-color: #000; color: #fff; font-family: Arial, sans-serif;"><p>From Todd Brannon Music</p><h1>Your download is ready.</h1><p>Thank you for your interest in ${leadMagnetTitle}.</p><a href="${downloadUrl}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none;">Download Now</a><p style="font-size: small;">If the button doesn't work, copy and paste this link: ${downloadUrl}</p></body></html>`,
    text: `From Todd Brannon Music\n\nYour download is ready.\n\nThank you for your interest in ${leadMagnetTitle}.\n\nDownload Now: ${downloadUrl}`
  };

  await transporter.sendMail(mailOptions);
}