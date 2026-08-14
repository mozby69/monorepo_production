// Validate browser-safe environment variables:

import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_SOCKET_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);