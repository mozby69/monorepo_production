import { z } from "zod";
export const updateRolePermissionsSchema = z.object({
    permissionIds: z
        .array(z.number().int().positive()),
});
