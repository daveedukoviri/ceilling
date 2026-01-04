const transporter = require('../config/mailConfig');

class EmailService {
  static async sendContactForm(data) {
    try {
      // Email to company
      const companyMailOptions = {
        from: `"GNG Group Quotations" <${process.env.SMTP_USER}>`,
        to: process.env.COMPANY_EMAIL,
        subject: `New Quotation Request from ${data.name}`,
        html: this.generateCompanyEmailTemplate(data),
      };

      // Email to customer
      const customerMailOptions = {
        from: `"GNG Group" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: 'Quotation Request Received - GNG Group',
        html: this.generateCustomerEmailTemplate(data),
      };

      // Send both emails
      await transporter.sendMail(companyMailOptions);
      await transporter.sendMail(customerMailOptions);

      return { success: true, message: 'Emails sent successfully' };
    } catch (error) {
      console.error('Email sending error:', error);
      throw new Error('Failed to send emails');
    }
  }

  static generateReferenceNumber() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `Q-${day}${month}${year}-${random}`;
  }

  static generateCompanyEmailTemplate(data) {
    const referenceNumber = this.generateReferenceNumber();
    const servicesMap = {
      'supplyOnly': 'Material Supply',
      'withInstallation': 'Installation',
      'consultation': 'Consultation',
      'siteVisit': 'Site Visit'
    };

    const formattedServices = data.services.map(service => servicesMap[service] || service);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          /* Base Styles */
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
          }
          
          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
          }
          
          /* Header */
          .header {
            padding: 32px 40px;
            background: #2c3e50;
            color: #ffffff;
            border-bottom: 4px solid #e67e22;
          }
          
          .company-name {
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          
          .company-subtitle {
            font-size: 14px;
            opacity: 0.9;
            font-weight: 300;
          }
          
          .reference {
            display: inline-block;
            background: rgba(255,255,255,0.1);
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 13px;
            margin-top: 16px;
            font-family: 'Monaco', 'Consolas', monospace;
          }
          
          /* Content */
          .content {
            padding: 40px;
          }
          
          .section {
            margin-bottom: 32px;
          }
          
          .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eaeaea;
            display: flex;
            align-items: center;
          }
          
          .section-title i {
            margin-right: 8px;
            color: #3498db;
          }
          
          /* Info Grid */
          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
          }
          
          .info-item {
            background: #f8f9fa;
            padding: 16px;
            border-radius: 6px;
            border-left: 3px solid #3498db;
          }
          
          .info-label {
            font-size: 12px;
            color: #7f8c8d;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }
          
          .info-value {
            font-size: 15px;
            font-weight: 500;
            color: #2c3e50;
          }
          
          .info-value a {
            color: #3498db;
            text-decoration: none;
          }
          
          /* Services */
          .services {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
          }
          
          .service-tag {
            background: #e8f4fc;
            color: #2980b9;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 13px;
            border: 1px solid #d6eaf8;
          }
          
          /* Message */
          .message-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #eaeaea;
            font-style: italic;
            color: #555;
            line-height: 1.7;
          }
          
          /* Priority */
          .priority-badge {
            display: inline-flex;
            align-items: center;
            background: ${data.urgent ? '#ffeaa7' : '#d5f4e6'};
            color: ${data.urgent ? '#d35400' : '#27ae60'};
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 13px;
            font-weight: 500;
            border: 1px solid ${data.urgent ? '#fad7a0' : '#a3e4d7'};
          }
          
          /* Actions */
          .actions {
            background: #f8f9fa;
            padding: 24px;
            border-radius: 8px;
            margin-top: 32px;
            border: 1px solid #eaeaea;
          }
          
          .action-title {
            font-size: 15px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 16px;
          }
          
          .action-steps {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          
          .action-step {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .step-number {
            background: #3498db;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
          }
          
          /* Footer */
          .footer {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 32px 40px;
            font-size: 13px;
          }
          
          .contact-methods {
            display: flex;
            gap: 24px;
            margin: 20px 0;
            flex-wrap: wrap;
          }
          
          .contact-method {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #bdc3c7;
            text-decoration: none;
          }
          
          .contact-method:hover {
            color: white;
          }
          
          .timestamp {
            color: #95a5a6;
            font-size: 12px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
          }
          
          /* Responsive */
          @media (max-width: 600px) {
            .header, .content, .footer {
              padding: 24px;
            }
            
            .info-grid {
              grid-template-columns: 1fr;
            }
            
            .contact-methods {
              flex-direction: column;
              gap: 16px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <!-- Header -->
          <div class="header">
            <div class="company-name">GNG Group</div>
            <div class="company-subtitle">Construction Materials & Solutions</div>
            <div class="reference">
              <i class="fas fa-hashtag"></i> ${referenceNumber}
              ${data.urgent ? ' | <span style="color:#ff7675">URGENT</span>' : ''}
            </div>
          </div>
          
          <!-- Content -->
          <div class="content">
            <div style="margin-bottom: 24px;">
              <h1 style="font-size: 20px; font-weight: 500; color: #2c3e50; margin: 0 0 8px 0;">
                New Quotation Request
              </h1>
              <p style="color: #7f8c8d; margin: 0;">
                Received via website contact form
              </p>
            </div>
            
            <!-- Contact Information -->
            <div class="section">
              <div class="section-title">
                <i class="fas fa-user"></i>
                Contact Information
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Name</div>
                  <div class="info-value">${data.name}</div>
                </div>
                ${data.company ? `
                <div class="info-item">
                  <div class="info-label">Company</div>
                  <div class="info-value">${data.company}</div>
                </div>
                ` : ''}
                <div class="info-item">
                  <div class="info-label">Email</div>
                  <div class="info-value">
                    <a href="mailto:${data.email}">${data.email}</a>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-label">Phone</div>
                  <div class="info-value">
                    <a href="tel:${data.phone}">${data.phone}</a>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Project Details -->
            <div class="section">
              <div class="section-title">
                <i class="fas fa-clipboard"></i>
                Project Details
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Material Type</div>
                  <div class="info-value" style="color: #e67e22; font-weight: 600;">
                    ${data.materialType}
                  </div>
                </div>
                ${data.projectType ? `
                <div class="info-item">
                  <div class="info-label">Project Type</div>
                  <div class="info-value">${data.projectType}</div>
                </div>
                ` : ''}
                <div class="info-item">
                  <div class="info-label">Quantity Range</div>
                  <div class="info-value">${data.quantity}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Priority</div>
                  <div class="info-value">
                    <span class="priority-badge">
                      <i class="fas fa-${data.urgent ? 'exclamation-circle' : 'clock'}"></i>
                      ${data.urgent ? 'Urgent' : 'Standard'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Services -->
            ${formattedServices.length > 0 ? `
            <div class="section">
              <div class="section-title">
                <i class="fas fa-tools"></i>
                Services Required
              </div>
              <div class="services">
                ${formattedServices.map(service => `
                  <span class="service-tag">${service}</span>
                `).join('')}
              </div>
            </div>
            ` : ''}
            
            <!-- Message -->
            <div class="section">
              <div class="section-title">
                <i class="fas fa-comment"></i>
                Customer Requirements
              </div>
              <div class="message-box">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <!-- Actions -->
           <div class="actions">
  <div class="action-title">Next Steps</div>

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding-bottom:12px;">
        <table cellpadding="0" cellspacing="0">
          <tr>
           
            <td style="padding-left:12px;">Prepare quotation document</td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding-bottom:12px;">
        <table cellpadding="0" cellspacing="0">
          <tr>
           
            <td style="padding-left:12px;">Contact customer for clarification</td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td>
        <table cellpadding="0" cellspacing="0">
          <tr>
          
            <td style="padding-left:12px;">Follow up within 2 hours</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>

            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div class="contact-methods">
              <a href="tel:+919246609090" class="contact-method">
                <i class="fas fa-phone"></i>
                +91 92466 09090
              </a>
              <a href="https://wa.me/919246609090" class="contact-method">
                <i class="fab fa-whatsapp"></i>
                WhatsApp
              </a>
              <a href="mailto:sreisai.shambhavi.enterprises@gmail.com" class="contact-method">
                <i class="fas fa-envelope"></i>
                Email
              </a>
            </div>
            <div class="timestamp">
              Request received: ${new Date().toLocaleString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    })}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  static generateCustomerEmailTemplate(data) {
    const referenceNumber = this.generateReferenceNumber();

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          /* Base Styles */
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
          }
          
          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
          }
          
          /* Header */
          .header {
            padding: 40px 40px 32px;
            text-align: center;
            border-bottom: 1px solid #eaeaea;
          }
          
          .logo {
            font-size: 28px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
          }
          
          .logo-subtitle {
            font-size: 14px;
            color: #7f8c8d;
            font-weight: 300;
          }
          
          .confirmation-icon {
            width: 64px;
            height: 64px;
            background: #27ae60;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 24px auto;
            color: white;
            font-size: 24px;
          }
          
          /* Content */
          .content {
            padding: 40px;
          }
          
          .greeting {
            font-size: 18px;
            font-weight: 500;
            color: #2c3e50;
            margin-bottom: 16px;
          }
          
          .message {
            color: #555;
            margin-bottom: 32px;
            font-size: 15px;
          }
          
          /* Reference */
          .reference-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #eaeaea;
            margin-bottom: 32px;
            text-align: center;
          }
          
          .reference-label {
            font-size: 12px;
            color: #7f8c8d;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }
          
          .reference-number {
            font-size: 20px;
            font-weight: 600;
            color: #2c3e50;
            font-family: 'Monaco', 'Consolas', monospace;
            letter-spacing: 1px;
          }
          
          /* Summary */
          .summary {
            margin-bottom: 32px;
          }
          
          .summary-title {
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eaeaea;
          }
          
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
          }
          
          .summary-item {
            padding: 16px;
            background: #f8f9fa;
            border-radius: 6px;
            border-left: 3px solid #3498db;
          }
          
          .summary-label {
            font-size: 12px;
            color: #7f8c8d;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }
          
          .summary-value {
            font-size: 15px;
            font-weight: 500;
            color: #2c3e50;
          }
          
          /* Next Steps */
          .next-steps {
            background: #f8f9fa;
            padding: 24px;
            border-radius: 8px;
            margin-bottom: 32px;
            border: 1px solid #eaeaea;
          }
          
          .steps-title {
            font-size: 15px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 16px;
          }
          
          .step {
            display: flex;
            align-items: flex-start;
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid #eaeaea;
          }
          
          .step:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }
          
          .step-number {
            background: #3498db;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
            margin-right: 12px;
            flex-shrink: 0;
          }
          
          .step-content h4 {
            margin: 0 0 4px 0;
            font-size: 14px;
            font-weight: 600;
            color: #2c3e50;
          }
          
          .step-content p {
            margin: 0;
            font-size: 13px;
            color: #7f8c8d;
          }
          
          /* Contact */
          .contact {
            text-align: center;
            margin-bottom: 32px;
            padding: 24px;
            background: #f8f9fa;
            border-radius: 8px;
          }
          
          .contact-title {
            font-size: 15px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 16px;
          }
          
          .contact-methods {
            display: flex;
            justify-content: center;
            gap: 24px;
            flex-wrap: wrap;
          }
          
          .contact-method {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #2c3e50;
          }
          
          .contact-icon {
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;
            border: 1px solid #eaeaea;
            color: #3498db;
          }
          
          .contact-label {
            font-size: 12px;
            color: #7f8c8d;
          }
          
          /* Footer */
          .footer {
            padding: 32px 40px;
            background: #2c3e50;
            color: #ecf0f1;
            font-size: 13px;
          }
          
          .footer-content {
            max-width: 400px;
            margin: 0 auto;
            text-align: center;
          }
          
          .company-info {
            margin-bottom: 16px;
            color: #bdc3c7;
          }
          
          .locations {
            font-size: 12px;
            color: #95a5a6;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid rgba(255,255,255,0.1);
          }
          
          /* Responsive */
          @media (max-width: 600px) {
            .header, .content, .footer {
              padding: 24px;
            }
            
            .summary-grid {
              grid-template-columns: 1fr;
            }
            
            .contact-methods {
              flex-direction: column;
              gap: 16px;
            }
            
            .contact-method {
              flex-direction: row;
              justify-content: center;
              gap: 12px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <!-- Header -->
          <div class="header">
            <div class="logo">GNG Group</div>
            <div class="logo-subtitle">Quality Construction Materials</div>
            <div class="confirmation-icon">
              ✓
            </div>
            <h1 style="font-size: 20px; font-weight: 500; color: #2c3e50; margin: 0;">
              Quotation Request Confirmed
            </h1>
          </div>
          
          <!-- Content -->
          <div class="content">
            <div class="greeting">
              Dear ${data.name},
            </div>
            
            <div class="message">
              Thank you for your interest in GNG Group's construction materials. We have received your quotation request and our team is reviewing your requirements.
            </div>
            
            <!-- Reference -->
            <div class="reference-box">
              <div class="reference-label">Reference Number</div>
              <div class="reference-number">${referenceNumber}</div>
              <div style="font-size: 12px; color: #7f8c8d; margin-top: 8px;">
                Please quote this number in all communications
              </div>
            </div>
            
            <!-- Summary -->
            <div class="summary">
              <div class="summary-title">Request Summary</div>
              <div class="summary-grid">
                <div class="summary-item">
                  <div class="summary-label">Material Type</div>
                  <div class="summary-value">${data.materialType}</div>
                </div>
                
                <div class="summary-item">
                  <div class="summary-label">Quantity Range</div>
                  <div class="summary-value">${data.quantity}</div>
                </div>
                
                ${data.projectType ? `
                <div class="summary-item">
                  <div class="summary-label">Project Type</div>
                  <div class="summary-value">${data.projectType}</div>
                </div>
                ` : ''}
                
                <div class="summary-item">
                  <div class="summary-label">Priority</div>
                  <div class="summary-value">
                    <span style="color: ${data.urgent ? '#e74c3c' : '#27ae60'}; font-weight: 600;">
                      ${data.urgent ? 'Urgent' : 'Standard'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Next Steps -->
            <div class="next-steps">
              <div class="steps-title">What Happens Next</div>
              
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>Expert Review</h4>
                  <p>Our material specialist will analyze your requirements</p>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>Quotation Preparation</h4>
                  <p>We'll prepare a detailed quotation with competitive pricing</p>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>Contact from Our Team</h4>
                  <p>You'll receive a call or email within 2 hours to discuss details</p>
                </div>
              </div>
            </div>
            
            <!-- Contact -->
            <div class="contact">
              <div class="contact-title">Need Immediate Assistance?</div>
              <div class="contact-methods">
                <a href="tel:+919246609090" class="contact-method">
                  <div class="contact-icon">
                    <i class="fas fa-phone"></i>
                  </div>
                  <div class="contact-label">Call Us</div>
                </a>
                
                <a href="https://wa.me/919246609090" class="contact-method">
                  <div class="contact-icon">
                    <i class="fab fa-whatsapp"></i>
                  </div>
                  <div class="contact-label">WhatsApp</div>
                </a>
                
                <a href="mailto:sreisai.shambhavi.enterprises@gmail.com" class="contact-method">
                  <div class="contact-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="contact-label">Email</div>
                </a>
              </div>
            </div>
            
            <!-- Note -->
            <div style="text-align: center; color: #7f8c8d; font-size: 13px; margin-top: 24px; padding-top: 24px; border-top: 1px solid #eaeaea;">
              This is an automated confirmation. A team member will contact you shortly.
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div class="footer-content">
              <div class="company-info">
                <strong>GNG Group</strong><br>
                Premium Construction Materials & Installation
              </div>
              
              <div class="locations">
                <div style="margin-bottom: 8px;">
                  <strong>Head Office:</strong><br>
                  RTC Complex Road, V L Puram, Rajahmundry
                </div>
                <div>
                  <strong>Branch:</strong><br>
                  Ramachandrarao Peta, Rajahmundry
                </div>
              </div>
              
              <div style="margin-top: 24px; font-size: 12px; color: #95a5a6;">
                © ${new Date().getFullYear()} GNG Group. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = EmailService;