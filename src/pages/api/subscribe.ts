import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // ponytail: JSON i stedet for formData — Fly-proxyen blokkerer form-content-type-POSTs
    const data = await request.json();
    const email = data.email;
    const honeypot = data.b_honeypot;

    // Honeypot check (prevent automated bot spam)
    if (honeypot && typeof honeypot === "string" && honeypot.length > 0) {
      console.warn("Spam bot submission trapped in honeypot.");
      return new Response(
        JSON.stringify({ success: true, message: "Thank you for subscribing! Please check your inbox to confirm." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      console.error("BUTTONDOWN_API_KEY environment variable is not configured.");
      return new Response(
        JSON.stringify({ error: "Newsletter subscription is temporarily unavailable." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email.trim(),
        metadata: {
          referrer: "website_signup_form"
        }
      }),
    });

    if (!response.ok) {
      const responseData = await response.json().catch(() => ({}));
      
      // Extract error details from Buttondown's potential error structures
      let errorMessage = "Failed to register subscriber.";
      if (responseData.detail) {
        errorMessage = responseData.detail;
      } else if (Array.isArray(responseData)) {
        errorMessage = responseData.join(" ");
      } else if (typeof responseData === "object") {
        errorMessage = Object.entries(responseData)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
          .join(" ");
      }
      // ponytail: detail kan være array av objekter (f.eks. 422 valideringsfeil)
      if (typeof errorMessage !== "string") {
        errorMessage = JSON.stringify(errorMessage);
      }

      // Handle duplicate subscription gracefully
      if (errorMessage.toLowerCase().includes("already") || errorMessage.toLowerCase().includes("exists")) {
        return new Response(
          JSON.stringify({ error: "You are already subscribed to the newsletter!" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Thank you for subscribing! Please check your inbox to confirm." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error occurred." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
