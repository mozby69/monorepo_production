import { z } from "zod";
import { registerUserSchema } from "../../authentication/user.schema";

export const createUserSchema =
    registerUserSchema.extend({
        roleIds: z
            .array(
                z.coerce.number().int().positive()
            )
            .min(1, "At least one role is required"),
    });

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().min(1).optional(),
    username: z.string().min(3).optional(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .or(z.literal(""))
        .optional(),
    roleIds: z.array(z.number().int().positive()).optional(),
    isActive: z.boolean().optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;