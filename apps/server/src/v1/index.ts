import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { logger } from "hono/logger";

import type { Plan } from "@openstatus/plans";

import { incidentApi } from "./incident";
import { incidenUpdateApi } from "./incidentUpdate";
import { middleware } from "./middleware";
import { monitorApi } from "./monitor";

export type Variables = {
  workspaceId: string;
  workspacePlan: Plan;
};

export const api = new OpenAPIHono<{ Variables: Variables }>();

/**
 * OpenAPI Reference
 */
api.doc("/openapi", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "OpenStatus API",
  },
});

api.get(
  "/docs",
  apiReference({
    spec: {
      url: "openapi",
    },
  }),
)

/**
 * Authentification Middleware
 */
api.use("/*", middleware);
api.use("/*", logger());
api.route("/monitor", monitorApi);
api.route("/incident_update", incidenUpdateApi);

api.route("/incident", incidentApi);