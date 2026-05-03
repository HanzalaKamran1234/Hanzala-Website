export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer re_c1tpEyD8_NKFusih9vKVQknRAQfmFcWCv`,
            },
            body: JSON.stringify({
                from: 'onboarding@resend.dev',
                to: 'growtoglow44@gmail.com',
                subject: `New Portfolio Message from ${name}`,
                html: `
                    <h2>New Message Received</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `,
            }),
        });

        if (response.ok) {
            return res.status(200).json({ message: 'Email sent successfully' });
        } else {
            const error = await response.json();
            return res.status(500).json({ message: 'Failed to send email', error });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
