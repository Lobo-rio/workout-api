# TypeORM + Supabase Setup

## ✅ Configuração realizada

### 1. Instalação de dependências
- `@nestjs/typeorm` - Integração NestJS com TypeORM
- `typeorm` - ORM para Node.js
- `pg` - Driver PostgreSQL

### 2. Estrutura de pastas criada
```
src/infra/database/typeorm/
├── entities/
│   ├── user.entity.ts
│   ├── exercise.entity.ts
│   └── workout-plan.entity.ts
├── migrations/
│   ├── 1739295000000-CreateUsersTable.ts
│   ├── 1739295001000-CreateExercisesTable.ts
│   └── 1739295002000-CreateWorkoutsTable.ts
└── database.config.ts
```

### 3. Entities configuradas

#### UserEntity
- `id` (UUID, primary key)
- `email` (VARCHAR, unique)
- `peso` (DECIMAL 5,2)
- `altura` (DECIMAL 3,2)
- `idade` (INT)
- `sexo` (VARCHAR 20)
- `objetivo` (VARCHAR 20)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

#### ExerciseEntity
- `id` (UUID, primary key)
- `nome` (VARCHAR)
- `met` (DECIMAL 4,1)
- `duracaoMediaMinutos` (INT)

#### WorkoutPlanEntity
- `id` (UUID, primary key)
- `userId` (UUID)
- `semana` (INT)
- `exerciciosPorDia` (JSONB)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### 4. Migrations executadas
```
✓ CreateUsersTable1739295000000
✓ CreateExercisesTable1739295001000
✓ CreateWorkoutsTable1739295002000
```

## 📋 Scripts disponíveis

```bash
npm run migration:generate    # Gera nova migration
npm run migration:run         # Executa migrations pendentes
npm run migration:revert      # Reverte a última migration
```

## 🔗 Variáveis de ambiente utilizadas

```dotenv
DATABASE_URL=127.0.0.1
DATABASE_PORT=54322
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
```

## ✨ Próximos passos

- Atualizar os repositórios (SupabaseUserRepository, SupabaseWorkoutRepository) para usar TypeORM
- Injetar EntityManager ou repositories no NestJS
- Criar seeders para popular dados iniciais (opcional)
