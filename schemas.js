import { z } from "zod";

export const TESTCASE = z
  .object({
    properties: z
      .object({
        property: z.array(
          z.any()
          // z.object({
          //   name: z.string(),
          //   value: z.string(),
          // })
        ),
      })
      .optional(),
    name: z.string(),
    classname: z.string(),
    time: z.coerce.number(),
    skipped: z.any().optional(),
    // If something was logged to STDOUT.
    "system-out": z.string().trim().optional(),
  })
  .strict();

export const TESTSUITE = z
  .object({
    testsuite: z.array(
      z
        .object({
          testcase: z.array(TESTCASE),
          name: z.string(),
          timestamp: z.coerce.date(),
          hostname: z.string(),
          tests: z.coerce.number(),
          failures: z.coerce.number(),
          skipped: z.coerce.number(),
          time: z.coerce.number(),
          errors: z.coerce.number(),
        })
        .strict()
    ),
    id: z.string(),
    name: z.string(),
    tests: z.coerce.number(),
    failures: z.coerce.number(),
    skipped: z.coerce.number(),
    errors: z.coerce.number(),
    time: z.coerce.number(),
  })
  .strict();

export const TESTSUITES = z.array(TESTSUITE);
