const { Resend } = require("resend");

// ⚠️ TEMPORARY: API key directly (OK for testing only)
const resend = new Resend("re_2v7YyE9S_NGTzbRvNr8D7QKPcNq5A4YWH");

class EmailService {
  static async sendContactForm(data) {
    try {
      const referenceNumber = this.generateReferenceNumber();

      /* =========================
         1️⃣ COMPANY / ADMIN EMAIL
         ========================= */
      await resend.emails.send({
        from: "GNG Group <onboarding@resend.dev>",
        to: ["gypsumcare@gmail.com"], // MUST be Resend signup email in sandbox
        subject: `New Quotation Request - ${referenceNumber}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><b>Name:</b> ${data.name || "N/A"}</p>
          <p><b>Email:</b> ${data.email || "N/A"}</p>
          <p><b>Material:</b> ${data.materialType || "N/A"}</p>
          <p><b>Urgent:</b> ${data.urgent ? "Yes" : "No"}</p>
          <p><b>Reference:</b> ${referenceNumber}</p>
        `,
      });

      /* =========================
         2️⃣ CUSTOMER AUTO-REPLY
         ⚠️ DISABLED IN SANDBOX
         ========================= */
      // ❌ DO NOT SEND to customer email yet
      // Resend sandbox will block it silently

      console.log("Emails sent successfully (sandbox)");
      return { success: true };
    } catch (error) {
      console.error("Email sending error:", error);
      throw new Error("Failed to send emails");
    }
  }

  static generateReferenceNumber() {
    const date = new Date();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `Q-${date.getDate()}${date.getMonth() + 1}${date
      .getFullYear()
      .toString()
      .slice(-2)}-${random}`;
  }
}

module.exports = EmailService;
