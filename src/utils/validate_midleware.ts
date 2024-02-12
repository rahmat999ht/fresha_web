import type { ValidationTargets } from "hono/types";
import {type ZodRawShape, type z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { HttpStatus } from "./http_status";
import HTTPException from "./http_epception";

import logger from "./logger";

const validatorSchemaMiddleware = <
  T extends ZodRawShape,
  Target extends keyof ValidationTargets,
>(
  target: Target,
  schema: z.ZodObject<T>,
) =>
  zValidator(target, schema, (result) => {
    if (!result.success) {
      logger.error(result.error.formErrors);
      logger.error(result.error.errors);
      throw new HTTPException(HttpStatus.BAD_REQUEST, {
        errors: result.error.formErrors.fieldErrors,
      });
    }
  });

export default validatorSchemaMiddleware;