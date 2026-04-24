
// Serviço de envio de e-mails transacionais via Brevo (ex-Sendinblue)

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY as string;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export interface ConexDemandaEmailData {
  nome: string;
  email: string;
  hotel: string;
  telefone?: string;
  tipoDemanda: string;
  assunto: string;
  descricao: string;
  createdAt: string;
}

const buildEmailTemplate = (data: ConexDemandaEmailData): string => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:600px;" cellpadding="0" cellspacing="0">

        <!-- Header -->
        <tr>
          <td style="background:#1a3c6e;padding:32px 40px;text-align:center;border-radius:12px 12px 0 0;">
            <img src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png"
                 alt="HoteisRio" style="height:44px;margin-bottom:14px;display:block;margin-left:auto;margin-right:auto;" />
            <h1 style="color:#ffffff;margin:0;font-size:20px;font-weight:700;letter-spacing:-0.3px;">
              Nova Demanda — Portal Conex
            </h1>
            <p style="color:#93b8dc;margin:8px 0 0;font-size:13px;">
              Recebida em ${new Date(data.createdAt).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:32px 40px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">

            <!-- Badge tipo + assunto -->
            <p style="margin:0 0 8px;">
              <span style="background:#dbeafe;color:#1e40af;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:1px;">
                ${data.tipoDemanda}
              </span>
            </p>
            <h2 style="color:#0f172a;font-size:22px;margin:0 0 28px;font-weight:700;line-height:1.3;">
              ${data.assunto}
            </h2>

            <!-- Dados do solicitante -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:24px;">
              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;">
                  <p style="margin:0;color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">Solicitante</p>
                  <p style="margin:4px 0 0;color:#0f172a;font-size:15px;font-weight:600;">${data.nome}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;">
                  <p style="margin:0;color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">E-mail</p>
                  <p style="margin:4px 0 0;font-size:15px;">
                    <a href="mailto:${data.email}" style="color:#1a3c6e;text-decoration:none;">${data.email}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 20px;${data.telefone ? 'border-bottom:1px solid #e2e8f0;' : ''}">
                  <p style="margin:0;color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">Hotel / Empresa</p>
                  <p style="margin:4px 0 0;color:#0f172a;font-size:15px;">${data.hotel}</p>
                </td>
              </tr>
              ${data.telefone ? `
              <tr>
                <td style="padding:14px 20px;">
                  <p style="margin:0;color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">Telefone / WhatsApp</p>
                  <p style="margin:4px 0 0;color:#0f172a;font-size:15px;">${data.telefone}</p>
                </td>
              </tr>` : ''}
            </table>

            <!-- Descrição -->
            <p style="margin:0 0 10px;color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">
              Descrição da Demanda
            </p>
            <div style="background:#f8fafc;border-left:4px solid #1a3c6e;padding:16px 20px;border-radius:0 8px 8px 0;
                        color:#334155;font-size:15px;line-height:1.7;white-space:pre-wrap;word-break:break-word;">
${data.descricao}
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;text-align:center;">
            <p style="color:#94a3b8;font-size:12px;margin:0;line-height:1.5;">
              Mensagem enviada automaticamente pelo <strong>Portal Conex · HoteisRio</strong><br>
              Para responder, utilize o e-mail do solicitante acima.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;

export const brevoService = {
  sendConexDemandaEmail: async (data: ConexDemandaEmailData): Promise<void> => {
    if (!BREVO_API_KEY) {
      console.warn('[Brevo] VITE_BREVO_API_KEY não configurado. E-mail não enviado.');
      return;
    }

    const payload = {
      sender: { name: 'Portal Conex – HoteisRio', email: 'marketing@hoteisrio.com.br' },
      to: [{ email: 'marketing@hoteisrio.com.br', name: 'Marketing HoteisRio' }],
      cc: [{ email: data.email, name: data.nome }],
      bcc: [
        { email: 'julie.souza@hoteisrio.com.br' },
        { email: 'theresa.jansen@hoteisrio.com.br' },
        { email: 'marketing@hoteisrio.com.br' },
      ],
      subject: `[Conex] ${data.tipoDemanda} — ${data.assunto}`,
      htmlContent: buildEmailTemplate(data),
    };

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Brevo API error ${response.status}: ${err}`);
    }
  },
};
