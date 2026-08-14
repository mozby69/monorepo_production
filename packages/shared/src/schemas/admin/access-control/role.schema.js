import { z } from "zod";
export const createRoleSchema = z.object({
    name: z
        .string()
        .min(1, "Role name is required"),
    description: z
        .string()
        .nullable()
        .optional(),
});
export const updateRoleSchema = z.object({
    name: z
        .string()
        .min(1, "Role name is required")
        .optional(),
    description: z
        .string()
        .nullable()
        .optional(),
});
