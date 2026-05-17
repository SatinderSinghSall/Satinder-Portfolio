const adminNotificationTemplate = ({ name, email, subject, message }) => {
  return `
  <div style="
    background: #f4f7fb;
    padding: 40px 20px;
    font-family: Arial, Helvetica, sans-serif;
    color: #111827;
  ">
    
    <div style="
      max-width: 650px;
      margin: auto;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    ">

      <!-- Header -->
      <div style="
        background: #111827;
        padding: 24px 30px;
        color: white;
      ">
        <h1 style="
          margin: 0;
          font-size: 22px;
          font-weight: 700;
        ">
          New Contact Message
        </h1>

        <p style="
          margin-top: 8px;
          color: #9ca3af;
          font-size: 14px;
        ">
          A new inquiry was submitted through your portfolio website.
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 30px;">

        <!-- User Details -->
        <table width="100%" cellpadding="0" cellspacing="0" style="
          border-collapse: collapse;
          margin-bottom: 25px;
        ">
          <tr>
            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e5e7eb;
              width: 140px;
              color: #6b7280;
              font-weight: 600;
            ">
              Name
            </td>

            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e5e7eb;
            ">
              ${name}
            </td>
          </tr>

          <tr>
            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e5e7eb;
              color: #6b7280;
              font-weight: 600;
            ">
              Email
            </td>

            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e5e7eb;
            ">
              <a href="mailto:${email}" style="
                color: #2563eb;
                text-decoration: none;
              ">
                ${email}
              </a>
            </td>
          </tr>

          <tr>
            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e5e7eb;
              color: #6b7280;
              font-weight: 600;
            ">
              Subject
            </td>

            <td style="
              padding: 12px 0;
              border-bottom: 1px solid #e5e7eb;
            ">
              ${subject}
            </td>
          </tr>
        </table>

        <!-- Message -->
        <div>
          <h2 style="
            margin-bottom: 12px;
            font-size: 16px;
            color: #111827;
          ">
            Message
          </h2>

          <div style="
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 18px;
            line-height: 1.7;
            color: #374151;
            white-space: pre-wrap;
          ">
            ${message}
          </div>
        </div>

        <!-- CTA -->
        <div style="
          margin-top: 30px;
          text-align: center;
        ">
          <a
            href="https://satinderpoetry.com/admin/contact-messages"
            style="
              display: inline-block;
              background: #111827;
              color: white;
              text-decoration: none;
              padding: 14px 24px;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 600;
            "
          >
            Open Admin Dashboard
          </a>
        </div>

      </div>

      <!-- Footer -->
      <div style="
        padding: 18px 30px;
        background: #f9fafb;
        border-top: 1px solid #e5e7eb;
        color: #6b7280;
        font-size: 13px;
      ">
        This notification was automatically generated from satinderpoetry.com
      </div>

    </div>
  </div>
  `;
};

module.exports = adminNotificationTemplate;

const adminNotificationTemplate2 = ({ name, email, subject, message }) => {
  const currentDate = new Date().toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
  <div style="
    margin: 0;
    padding: 40px 20px;
    background: #eef2f7;
    font-family: Inter, Arial, Helvetica, sans-serif;
    color: #111827;
  ">

    <div style="
      max-width: 720px;
      margin: auto;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
      box-shadow:
        0 10px 30px rgba(15, 23, 42, 0.08),
        0 4px 10px rgba(15, 23, 42, 0.04);
    ">

      <!-- TOP STATUS BAR -->
      <div style="
        background: linear-gradient(135deg, #0f172a 0%, #111827 100%);
        padding: 16px 28px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      ">

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>

            <td align="left">
              <div style="
                display: inline-flex;
                align-items: center;
                gap: 8px;
              ">
                <span style="
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  background: #22c55e;
                  border-radius: 999px;
                "></span>

                <span style="
                  color: #d1d5db;
                  font-size: 13px;
                  font-weight: 600;
                  letter-spacing: 0.4px;
                  text-transform: uppercase;
                ">
                  Contact System Notification
                </span>
              </div>
            </td>

            <td align="right">
              <span style="
                color: #9ca3af;
                font-size: 12px;
              ">
                ${currentDate}
              </span>
            </td>

          </tr>
        </table>

      </div>

      <!-- HERO -->
      <div style="
        background:
          radial-gradient(circle at top right, rgba(59,130,246,0.18), transparent 25%),
          linear-gradient(180deg, #0f172a 0%, #111827 100%);
        padding: 42px 32px;
        position: relative;
      ">

        <div style="
          display: inline-block;
          background: rgba(255,255,255,0.08);
          color: #93c5fd;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.08);
        ">
          New Inquiry Received
        </div>

        <h1 style="
          margin: 22px 0 12px;
          color: #ffffff;
          font-size: 34px;
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: -1px;
        ">
          Someone contacted you
        </h1>

        <p style="
          margin: 0;
          color: #cbd5e1;
          font-size: 16px;
          line-height: 1.7;
          max-width: 540px;
        ">
          A new contact form submission was received through your portfolio website.
          Review the details below and respond directly if required.
        </p>

      </div>

      <!-- BODY -->
      <div style="padding: 34px;">

        <!-- CARD -->
        <div style="
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          overflow: hidden;
          background: #ffffff;
        ">

          <!-- CARD HEADER -->
          <div style="
            padding: 20px 24px;
            background: #f8fafc;
            border-bottom: 1px solid #e5e7eb;
          ">
            <h2 style="
              margin: 0;
              font-size: 17px;
              color: #111827;
              font-weight: 700;
            ">
              Contact Details
            </h2>
          </div>

          <!-- DETAILS -->
          <div style="padding: 8px 24px 0;">

            <table width="100%" cellpadding="0" cellspacing="0" style="
              border-collapse: collapse;
            ">

              <tr>
                <td style="
                  padding: 18px 0;
                  border-bottom: 1px solid #f1f5f9;
                  width: 140px;
                  color: #6b7280;
                  font-size: 14px;
                  font-weight: 700;
                  vertical-align: top;
                ">
                  Full Name
                </td>

                <td style="
                  padding: 18px 0;
                  border-bottom: 1px solid #f1f5f9;
                  color: #111827;
                  font-size: 15px;
                  font-weight: 600;
                ">
                  ${name}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 18px 0;
                  border-bottom: 1px solid #f1f5f9;
                  color: #6b7280;
                  font-size: 14px;
                  font-weight: 700;
                  vertical-align: top;
                ">
                  Email Address
                </td>

                <td style="
                  padding: 18px 0;
                  border-bottom: 1px solid #f1f5f9;
                ">
                  <a
                    href="mailto:${email}"
                    style="
                      color: #2563eb;
                      text-decoration: none;
                      font-size: 15px;
                      font-weight: 600;
                    "
                  >
                    ${email}
                  </a>
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 18px 0;
                  border-bottom: 1px solid #f1f5f9;
                  color: #6b7280;
                  font-size: 14px;
                  font-weight: 700;
                  vertical-align: top;
                ">
                  Subject
                </td>

                <td style="
                  padding: 18px 0;
                  border-bottom: 1px solid #f1f5f9;
                  color: #111827;
                  font-size: 15px;
                  font-weight: 600;
                ">
                  ${subject}
                </td>
              </tr>

            </table>

          </div>

          <!-- MESSAGE -->
          <div style="padding: 24px;">

            <div style="
              margin-bottom: 14px;
              color: #6b7280;
              font-size: 14px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.4px;
            ">
              Message
            </div>

            <div style="
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              padding: 24px;
              color: #334155;
              line-height: 1.9;
              font-size: 15px;
              white-space: pre-wrap;
            ">
              ${message}
            </div>

          </div>

        </div>

        <!-- BUTTONS -->
        <div style="
          margin-top: 30px;
        ">

          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>

              <td align="left">

                <a
                  href="mailto:${email}"
                  style="
                    display: inline-block;
                    background: #111827;
                    color: white;
                    text-decoration: none;
                    padding: 14px 22px;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 700;
                    box-shadow: 0 4px 12px rgba(17,24,39,0.15);
                  "
                >
                  Reply to Sender
                </a>

              </td>

              <td align="right">

                <a
                  href="https://satinderpoetry.com/admin/contact-messages"
                  style="
                    display: inline-block;
                    background: #eff6ff;
                    color: #2563eb;
                    text-decoration: none;
                    padding: 14px 22px;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 700;
                    border: 1px solid #bfdbfe;
                  "
                >
                  Open Admin Panel
                </a>

              </td>

            </tr>
          </table>

        </div>

      </div>

      <!-- FOOTER -->
      <div style="
        background: #f8fafc;
        border-top: 1px solid #e5e7eb;
        padding: 22px 30px;
      ">

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>

            <td align="left">

              <div style="
                color: #111827;
                font-size: 14px;
                font-weight: 700;
              ">
                satinderpoetry.com
              </div>

              <div style="
                margin-top: 6px;
                color: #6b7280;
                font-size: 13px;
                line-height: 1.6;
              ">
                Automated portfolio contact notification system.
              </div>

            </td>

            <td align="right">

              <div style="
                display: inline-block;
                background: #dcfce7;
                color: #166534;
                padding: 8px 12px;
                border-radius: 999px;
                font-size: 12px;
                font-weight: 700;
              ">
                System Active
              </div>

            </td>

          </tr>
        </table>

      </div>

    </div>

  </div>
  `;
};

module.exports = adminNotificationTemplate;

const adminNotificationTemplate3 = ({ name, email, subject, message }) => {
  const currentDate = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
  <div style="
    background: #f3f6fb;
    padding: 40px 20px;
    font-family: Inter, Arial, Helvetica, sans-serif;
    color: #111827;
  ">
    
    <div style="
      max-width: 680px;
      margin: auto;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      overflow: hidden;
      box-shadow:
        0 10px 25px rgba(15,23,42,0.06),
        0 2px 8px rgba(15,23,42,0.04);
    ">

      <!-- Top Admin Bar -->
      <div style="
        background: #0f172a;
        padding: 14px 24px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      ">

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>

            <td align="left">
              <span style="
                color: #cbd5e1;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 1px;
                text-transform: uppercase;
              ">
                Contact Notification System
              </span>
            </td>

            <td align="right">
              <span style="
                color: #94a3b8;
                font-size: 12px;
              ">
                ${currentDate}
              </span>
            </td>

          </tr>
        </table>

      </div>

      <!-- Header -->
      <div style="
        background: linear-gradient(
          to bottom,
          #111827,
          #1f2937
        );
        padding: 32px 30px;
        color: white;
      ">

        <div style="
          display: inline-block;
          background: rgba(255,255,255,0.08);
          color: #93c5fd;
          padding: 7px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 18px;
        ">
          New Submission
        </div>

        <h1 style="
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
        ">
          New Contact Message
        </h1>

        <p style="
          margin-top: 10px;
          color: #cbd5e1;
          font-size: 15px;
          line-height: 1.7;
          max-width: 520px;
        ">
          A new inquiry was submitted through your portfolio contact form.
          Review the details below.
        </p>

      </div>

      <!-- Body -->
      <div style="padding: 32px;">

        <!-- Info Card -->
        <div style="
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          overflow: hidden;
          background: #ffffff;
        ">

          <!-- Section Header -->
          <div style="
            padding: 18px 22px;
            background: #f8fafc;
            border-bottom: 1px solid #e5e7eb;
          ">
            <h2 style="
              margin: 0;
              font-size: 15px;
              font-weight: 700;
              color: #111827;
            ">
              Contact Details
            </h2>
          </div>

          <!-- Details -->
          <div style="padding: 0 22px;">

            <table width="100%" cellpadding="0" cellspacing="0" style="
              border-collapse: collapse;
            ">

              <tr>
                <td style="
                  padding: 16px 0;
                  border-bottom: 1px solid #f1f5f9;
                  width: 120px;
                  color: #64748b;
                  font-size: 14px;
                  font-weight: 700;
                ">
                  Name
                </td>

                <td style="
                  padding: 16px 0;
                  border-bottom: 1px solid #f1f5f9;
                  font-size: 15px;
                  color: #111827;
                  font-weight: 600;
                ">
                  ${name}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 16px 0;
                  border-bottom: 1px solid #f1f5f9;
                  color: #64748b;
                  font-size: 14px;
                  font-weight: 700;
                ">
                  Email
                </td>

                <td style="
                  padding: 16px 0;
                  border-bottom: 1px solid #f1f5f9;
                ">
                  <a href="mailto:${email}" style="
                    color: #2563eb;
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 600;
                  ">
                    ${email}
                  </a>
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 16px 0;
                  border-bottom: 1px solid #f1f5f9;
                  color: #64748b;
                  font-size: 14px;
                  font-weight: 700;
                ">
                  Subject
                </td>

                <td style="
                  padding: 16px 0;
                  border-bottom: 1px solid #f1f5f9;
                  font-size: 15px;
                  color: #111827;
                  font-weight: 600;
                ">
                  ${subject}
                </td>
              </tr>

            </table>

          </div>

          <!-- Message -->
          <div style="padding: 24px 22px 22px;">

            <div style="
              margin-bottom: 12px;
              font-size: 13px;
              font-weight: 700;
              letter-spacing: 0.5px;
              text-transform: uppercase;
              color: #64748b;
            ">
              Message
            </div>

            <div style="
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 20px;
              line-height: 1.8;
              color: #334155;
              font-size: 15px;
              white-space: pre-wrap;
            ">
              ${message}
            </div>

          </div>

        </div>

        <!-- CTA -->
        <div style="
          margin-top: 28px;
          text-align: center;
        ">

          <a
            href="https://satinder-portfolio.vercel.app/admin/contact-messages"
            style="
              display: inline-block;
              background: #111827;
              color: white;
              text-decoration: none;
              padding: 14px 26px;
              border-radius: 10px;
              font-size: 14px;
              font-weight: 700;
              box-shadow: 0 4px 12px rgba(17,24,39,0.15);
            "
          >
            Open Admin Dashboard
          </a>

        </div>

      </div>

      <!-- Footer -->
      <div style="
        padding: 18px 28px;
        background: #f8fafc;
        border-top: 1px solid #e5e7eb;
      ">

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>

            <td align="left">
              <div style="
                color: #111827;
                font-size: 13px;
                font-weight: 700;
              ">
                satinderpoetry.com
              </div>

              <div style="
                margin-top: 4px;
                color: #6b7280;
                font-size: 12px;
              ">
                Automated contact notification
              </div>
            </td>

            <td align="right">

              <div style="
                display: inline-block;
                background: #dcfce7;
                color: #166534;
                padding: 6px 10px;
                border-radius: 999px;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.3px;
              ">
                SYSTEM ACTIVE
              </div>

            </td>

          </tr>
        </table>

      </div>

    </div>
  </div>
  `;
};

module.exports = adminNotificationTemplate;
