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
  html: `<!DOCTYPE html>
    <html>
      <body style="margin:0; padding:0; background-color:#000000;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
                <tr>
                  <td style="padding: 32px; color: #ffffff; font-family: Arial, sans-serif;">
                    <p style="margin-top:0;">From Todd Brannon Music</p>
                    <h1 style="margin: 0 0 24px 0; font-size: 28px;">Your download is ready.</h1>
                    <p style="font-size: 18px; margin: 0 0 24px 0;">Thank you for your interest in ${leadMagnetTitle}.</p>
                    <a href="${downloadUrl}" style="display:inline-block; background-color: #007bff; color: #fff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-size: 18px; margin-bottom: 24px;">Download Now</a>
                    <p style="font-size: 13px; color: #bbb; margin-top: 24px;">If the button doesn't work, copy and paste this link:<br><span style="word-break:break-all; color:#fff;">${downloadUrl}</span></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`,
  text: `From Todd Brannon Music\n\nYour download is ready.\n\nThank you for your interest in ${leadMagnetTitle}.\n\nDownload Now: ${downloadUrl}`
};

  await transporter.sendMail(mailOptions);
}