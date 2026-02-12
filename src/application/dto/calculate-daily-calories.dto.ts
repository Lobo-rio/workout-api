import { z } from 'zod';

export const calculateDailyCaloriesSchema = z.object({
  met: z.number().positive(),
  peso: z.number().positive(),
  minutos: z.number().positive(),
});

export type CalculateDailyCaloriesDto = z.infer<typeof calculateDailyCaloriesSchema>;
