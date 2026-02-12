import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  peso: z.number().positive(),
  altura: z.number().positive(),
  idade: z.number().int().positive(),
  sexo: z.enum(['masculino', 'feminino', 'outro']),
  objetivo: z.enum(['perder_peso', 'ganhar_massa']),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
