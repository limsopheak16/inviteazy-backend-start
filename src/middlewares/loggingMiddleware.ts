import { Request, Response, NextFunction } from "express";
import { logger } from "../services/loggerService";
import { sanitizeRequestData, maskResponseBody} from "../utils/sanitizeRequestData";

export function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();

  // Sanitize the request data
  const sanitizedRequestLog = sanitizeRequestData(req);

  logger.info("Request received", sanitizedRequestLog);

  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - startTime;

    // Mask all fields in the response body
    const maskedBody = maskResponseBody(
      typeof body === "string" ? JSON.parse(body) : body
    );

    const responseLog = {
      status: res.statusCode,
      body: typeof maskedBody === "string" ? maskedBody : JSON.stringify(maskedBody),
      duration: `${duration}ms`,
    };
    logger.info("Response sent", responseLog);
    return originalSend.call(this, body);
  };

  next();
}