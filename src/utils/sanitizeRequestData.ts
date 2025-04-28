import express, { Request } from "express";

export function sanitizeRequestData(req: Request): Record<string, any> {
  const safeData: Record<string, any> = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  };

  if (req.body && Object.keys(req.body).length > 0) {
    // Mask all fields in the request body
    const maskedBody: Record<string, any> = {};
    for (const key in req.body) {
      maskedBody[key] = "[MASKED]";
    }
    safeData.body = maskedBody;
  }

  if (req.cookies && req.cookies.sessionId) {
    safeData.cookies = { sessionId: "[MASKED]" };
  }

  return safeData;
}

export function maskResponseBody(body: any): any {
  if (!body || typeof body !== "object") {
    return "[MASKED]"; // Mask non-object bodies as well
  }

  const maskedBody: Record<string, any> = {};

  // Replace all fields with "[MASKED]"
  for (const key in body) {
    if (typeof body[key] === "object") {
      // Recursively mask nested objects
      maskedBody[key] = maskResponseBody(body[key]);
    } else {
      maskedBody[key] = "[MASKED]";
    }
  }

  return maskedBody;
}
