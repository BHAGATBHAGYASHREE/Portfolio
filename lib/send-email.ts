"use server"

interface EmailData {
  to: string
  subject: string
  from: string
  message: string
}

export async function sendEmail(data: EmailData) {
  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: data.to }] }],
        from: { email: "portfolio@bhagyashreebhagat.com" }, // This should be a verified sender in your SendGrid account
        subject: data.subject,
        content: [
          {
            type: "text/html",
            value: `
            <h2>New message from your portfolio website</h2>
            <p><strong>From:</strong> ${data.from}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          `,
          },
        ],
        reply_to: { email: data.from },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error("SendGrid API error:", errorData || response.statusText)
      throw new Error("Failed to send email")
    }

    return { success: true }
  } catch (error) {
    console.error("Email sending error:", error)
    throw new Error("Failed to send email")
  }
}
