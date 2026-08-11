// ==========================================================================
// SUPABASE EDGE FUNCTION: new-lead-notification
// ==========================================================================
// This function is triggered automatically when a new lead is inserted
// into the `leads` table. It does three things:
//
//   1. Sends YOU an email notification (with [NEW LEAD] in subject)
//   2. Sends the CLIENT an auto-respond confirmation email
//   3. Sends YOU a Telegram message notification
//
// SETUP INSTRUCTIONS:
//   1. Go to Supabase → Edge Functions → New Function
//   2. Name it "new-lead-notification"
//   3. Paste this entire file as the content
//   4. Go to Project Settings → Edge Functions → add these secrets:
//      - NOTIFY_EMAIL:     your email (e.g. gchuazj@gmail.com)
//      - RESEND_API_KEY:   get from resend.com (free, 3000 emails/month)
//      - TELEGRAM_BOT_TOKEN: your bot token (talk to @BotFather)
//      - TELEGRAM_CHAT_ID:   your chat ID (683970124)
//   5. Go to Database → Webhooks → Create webhook:
//      - Table: leads
//      - Event: INSERT
//      - Function: new-lead-notification
//
// ALTERNATIVE (if Edge Functions seem complex):
//   Use Make.com instead — see README.md for Make.com setup guide.
//   It does the same thing but with a visual interface, no code.
// ==========================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") || "";
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID") || "683970124";
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") || "gchuazj@gmail.com";

// --- Your email notification (to you) ---
async function sendLeadNotification(lead: any) {
  if (!RESEND_API_KEY) {
    console.log("RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const subject = `[NEW LEAD] ${lead.name} — ${lead.subject || "New inquiry"}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2563eb;">🔔 New Lead Received</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold; width: 100px;">Name:</td><td style="padding: 8px;">${lead.name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${lead.email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Project:</td><td style="padding: 8px;">${lead.subject || "—"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Source:</td><td style="padding: 8px;">${lead.source || "portfolio"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Date:</td><td style="padding: 8px;">${new Date(lead.created_at).toLocaleString()}</td></tr>
      </table>
      <h3 style="margin-top: 20px;">Message:</h3>
      <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
        ${lead.message}
      </div>
      <p style="margin-top: 20px; color: #64748b; font-size: 14px;">
        View all leads in your <a href="https://supabase.com/dashboard/project/brmjunwijnwoljeypnik/table/leads">Supabase dashboard</a>
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      subject: subject,
      html: html,
    }),
  });

  console.log("Notification email sent:", res.status);
}

// --- Auto-respond to client ---
async function sendAutoRespond(lead: any) {
  if (!RESEND_API_KEY) {
    console.log("RESEND_API_KEY not set — skipping auto-respond");
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2563eb;">Hi ${lead.name},</h2>
      <p>Thanks for reaching out through my portfolio website! I've received your message:</p>
      <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 16px 0;">
        <em>"${lead.message}"</em>
      </div>
      <p>I'll get back to you within 24 hours. If it's urgent, feel free to reach me directly:</p>
      <ul style="color: #475569;">
        <li>Email: gchuazj@gmail.com</li>
        <li>Telegram: @Gene_Chuaa</li>
      </ul>
      <p>Looking forward to discussing your project!</p>
      <p style="margin-top: 24px;">
        Best regards,<br>
        <strong>Gene</strong><br>
        <span style="color: #64748b;">Full-Stack Product Developer</span>
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: lead.email,
      subject: "Thanks for reaching out — I've received your message",
      html: html,
    }),
  });

  console.log("Auto-respond email sent:", res.status);
}

// --- Telegram notification ---
async function sendTelegramNotification(lead: any) {
  if (!TELEGRAM_BOT_TOKEN) {
    console.log("TELEGRAM_BOT_TOKEN not set — skipping Telegram notification");
    return;
  }

  const text = [
    "🔔 *New Lead*",
    "",
    `*Name:* ${lead.name}`,
    `*Email:* ${lead.email}`,
    `*Project:* ${lead.subject || "—"}`,
    `*Source:* ${lead.source || "portfolio"}`,
    "",
    "*Message:*",
    lead.message,
    "",
    `_${new Date(lead.created_at).toLocaleString()}_`,
  ].join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "Markdown",
      }),
    }
  );

  console.log("Telegram notification sent:", res.status);
}

// --- Main handler ---
serve(async (req: Request) => {
  try {
    const payload = await req.json();

    // Supabase webhook sends { type: "INSERT", record: { ...lead } }
    // Or if called directly, it sends the lead object
    const lead = payload.record || payload;

    if (!lead || !lead.email) {
      return new Response("Invalid payload", { status: 400 });
    }

    console.log("New lead received:", lead.name, lead.email);

    // Run all three notifications in parallel (don't wait for each other)
    await Promise.allSettled([
      sendLeadNotification(lead),
      sendAutoRespond(lead),
      sendTelegramNotification(lead),
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing lead notification:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});