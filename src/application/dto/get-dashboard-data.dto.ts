import { z } from 'zod';

export const getDashboardDataSchema = z.object({
  userId: z.string().min(1),
});

export type GetDashboardDataDto = z.infer<typeof getDashboardDataSchema>;
