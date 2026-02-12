import { z } from 'zod';

export const generateWorkoutPlanSchema = z.object({
  userId: z.string().min(1),
  semana: z.number().int().positive().optional(),
});

export type GenerateWorkoutPlanDto = z.infer<typeof generateWorkoutPlanSchema>;
