import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, eventDate, venue, guests, package: pkg, message } = body;

    if (!name || !email || !phone || !eventDate) {
      return NextResponse.json(
        { error: "Name, email, phone and event date are required." },
        { status: 400 }
      );
    }

    // TODO: Wire this up to a real email/CRM provider or calendar system.
    // This is where you'd send a notification to the studio and a
    // confirmation email to the client, and optionally create a
    // tentative calendar hold for the requested date.
    console.log("New booking request received:", {
      name,
      email,
      phone,
      service,
      eventDate,
      venue,
      guests,
      package: pkg,
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
