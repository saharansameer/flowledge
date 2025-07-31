import { getCurrentFullYear } from "@/utils/common";

export const userWelcomeEmailTemplate = {
  html: `
<div style="max-width:600px;margin:40px auto;padding:40px 24px;background:#ffffff;border-radius:8px;font-family:Arial,sans-serif;color:#444444;">
  <h1 style="font-size:28px;margin-top:0;color:#111111;">Welcome to Flowledge</h1>
  <p>Hey there, We're thrilled to have you onboard. Your account has been created successfully on Flowledge.</p>
  <p style=font-size:12px;>If this wasn't requested by you, kindly report it ASAP by contacting us at: <a href="mailto:flowledge@sameersaharan.com" style="color:#10b981;">flowledge@sameersaharan.com</a></p>
  <p style="font-size:12px;color:#999999;margin-top:40px;">&copy; ${getCurrentFullYear()} Flowledge</p>
</div>
`,
  text: `Welcome to Flowledge

Hey there, We're thrilled to have you onboard.
Your account has been created successfully on Flowledge.

If this wasn't requested by you, kindly report it ASAP by contacting us at: flowledge@sameersaharan.com

© ${getCurrentFullYear()} Flowledge
`,
};

export const expertWelcomeEmailTemplate = {
  html: `
<div style="max-width:600px;margin:40px auto;padding:40px 24px;background:#ffffff;border-radius:8px;font-family:Arial,sans-serif;color:#444444;">
  <h1 style="font-size:28px;margin-top:0;color:#111111;">Welcome to Flowledge</h1>
  <p>Hey there, We're thrilled to have you onboard. Your account has been created successfully and you're now an Expert on Flowledge.</p>
  <p>Please make sure you have added your designation and relevant skills correctly, this is crucial for assigning tickets.</p>
  <p style=font-size:12px;>If this wasn't requested by you, kindly report it ASAP by contacting us at: <a href="mailto:flowledge@sameersaharan.com" style="color:#10b981;">flowledge@sameersaharan.com</a></p>
  <p style="font-size:12px;color:#999999;margin-top:40px;">&copy; ${getCurrentFullYear()} Flowledge</p>
</div>
`,
  text: `Welcome to Flowledge

Hey there, We're thrilled to have you onboard.
Your account has been created successfully on Flowledge.

Make sure you have added your designation and relevant skills correctly, as it is crucial for tickets assigning.

If this wasn't requested by you, kindly report it ASAP by contacting us at: flowledge@sameersaharan.com

© ${getCurrentFullYear()} Flowledge
`,
};

export const ticketClosedStatusTemplate = (ticketId: string) => {
  return {
    html: `
<div style="max-width:600px;margin:40px auto;padding:40px 24px;background:#ffffff;border-radius:8px;font-family:Arial,sans-serif;color:#444444;">
  <h1 style="font-size:24px;margin-top:0;color:#111111;">Ticket Closed</h1>
  <p>Hey there,</p>
  <p>The user has closed the Ticket <em>#${ticketId}</em> you were working on.</p>
  <p>Thank you for your support and expertise on this issue.</p>
  <p>Regards,</p>
  <p>Team Flowledge</p>
  <p style="font-size:13px;color:#999999;margin-top:40px;">&copy; ${new Date().getFullYear()} Flowledge</p>
</div>
`,
    text: `Hey there,

The user has closed the Ticket #${ticketId} you were working on.

Thank you for your support and expertise on this issue.

Regards,

Team Flowledge

© ${new Date().getFullYear()} Flowledge
`,
  };
};

export const ticketResolvedStatusTemplate = (ticketId: string) => {
  return {
    html: `
<div style="max-width:600px;margin:40px auto;padding:40px 24px;background:#ffffff;border-radius:8px;font-family:Arial,sans-serif;color:#444444;">
  <h1 style="font-size:24px;margin-top:0;color:#111111;">Ticket Resolved</h1>
  <p>Hey there,</p>
  <p>The expert has marked your Ticket <em>#${ticketId}</em> as resolved.</p>
  <p>If you believe the issue hasn't been fully addressed, feel free to create a new ticket.</p>
  <p>Regards,</p>
  <p>Team Flowledge</p>
  <p style="font-size:13px;color:#999999;margin-top:40px;">&copy; ${new Date().getFullYear()} Flowledge</p>

</div>
`,
    text: `Hey there,

The expert has marked your Ticket #${ticketId} as resolved.

If the issue still persists or you have follow-up questions, feel free to reopen the ticket or create a new one.

Regards,

Team Flowledge

© ${new Date().getFullYear()} Flowledge
`,
  };
};
