import { Pool, QueryResult } from "pg";
import { logger } from "../../services/loggerService";
import crypto from "crypto"; // Import Node.js crypto module for hashing

// Function to hash all parameters
function hashParams(params: any[]): any[] {
  return params.map((param) => {
    if (typeof param === "string" || typeof param === "number") {
      // Hash the parameter (convert numbers to strings before hashing)
      return crypto.createHash("sha256").update(String(param)).digest("hex");
    }
    return param; // Return non-string/non-number parameters as-is
  });
}

export async function queryWithLogging<T>(
  pool: Pool,
  sql: string,
  params: any[] = [],
  requestId?: string
): Promise<QueryResult<any>> {
  const startTime = Date.now();
  try {
    const result = await pool.query(sql, params);
    const duration = Date.now() - startTime;

    // Hash all params before logging
    const hashedParams = hashParams(params);

    logger.info("Database query executed", {
      requestId,
      sql,
      params: hashedParams, // Log hashed params
      rowCount: result.rowCount,
      duration: `${duration}ms`,
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      const duration = Date.now() - startTime;

      // Hash all params before logging
      const hashedParams = hashParams(params);

      logger.error("Database query failed", {
        requestId,
        sql,
        params: hashedParams, // Log hashed params
        error: error.message,
        duration: `${duration}ms`,
      });
    }
    throw error;
  }
}