import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    // TODO: Wire this up to a real email/CRM provider, e.g. Resend, SendGrid,
    // or a Google Sheet webhook. Example with Resend:
    //
    // await resend.emails.send({
    //   from: "Dimple Photography Website <no-reply@dimplephotographymansa.com>",
    //   to: "hello@dimplephotographymansa.com",
    //   subject: `New enquiry from ${name}`,
    //   text: `${name} (${email}, ${phone}) — ${service} on ${date}\n\n${message}`,
    // });

    console.log("New enquiry received:", {
      name,
      email,
      phone,
      service,
      date,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
