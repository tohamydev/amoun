import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Use an environment variable for the API key
const resend = new Resend('re_ejM2HpoN_GfJhXPoJmhL66uzFgDSK3tVG')

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // if (!process.env.RESEND_API_KEY) {
    //   console.error('RESEND_API_KEY is not set')
    //   return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 })
    // }

    const { data, error } = await resend.emails.send({
      from: 'Amoun Chemicals <noreply@amounchemicals.com>',
      to: ['info@www.amounchemicals.com'],
      subject: 'New Contact Form Submission',
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Email sent successfully', data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

