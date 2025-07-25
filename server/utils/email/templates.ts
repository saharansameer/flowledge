import { getCurrentFullYear } from "@/utils/common";

export const welcomeEmailTemplate = {
  html: `
<div style="max-width:600px;margin:40px auto;padding:40px 24px;background:#ffffff;border-radius:8px;font-family:Arial,sans-serif;color:#444444;">
  <h1 style="font-size:28px;margin-top:0;color:#111111;">Welcome to Flowledge</h1>
  <p>Hey there, We're thrilled to have you onboard. Your account has been created successfully on Flowledge.</p>
  <p>If this wasn't requested by you, kindly report it ASAP by contacting us at: <a href="mailto:flowledge@sameersaharan.com" style="color:#10b981;">flowledge@sameersaharan.com</a></p>
  <p style="font-size:13px;color:#999999;margin-top:40px;">&copy; ${getCurrentFullYear()} Flowledge. All Rights Reserved.</p>
</div>
`,
  text: `Welcome to Flowledge

Hey there, We're thrilled to have you onboard.
Your account has been created successfully on Flowledge.

If this wasn't requested by you, kindly report it ASAP by contacting us at: flowledge@sameersaharan.com

© ${getCurrentFullYear()} Flowledge. All Rights Reserved.
`,
};
