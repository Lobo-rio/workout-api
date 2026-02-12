<p align="center">
  <img src="docs/banner.svg" alt="Workout API banner" width="100%" />
</p>

# Workout API

Backend com arquitetura hexagonal e integracao com Supabase. Inclui regra de negocio para calculo de calorias e endpoints protegidos por JWT.

<p align="center">
  <img src="docs/hexagon.svg" alt="Hexagonal layout" width="86%" />
</p>

## ✅ Passo a passo

### � 1) Configurar Supabase Local

O projeto usa Supabase localmente através de containers Docker. Isso permite desenvolver sem depender de serviços externos.

**Inicializar o Supabase:**

```bash
npx supabase init
```

**Iniciar os containers do Supabase:**

```bash
npx supabase start
```

Este comando iniciará os seguintes serviços:

- **PostgreSQL** (porta 54322): banco de dados
- **API REST/Auth** (porta 54321): endpoints REST e autenticação
- **Studio** (porta 54323): interface visual de gerenciamento
- **Mailpit** (porta 54324): captura de emails para testes
- **GraphQL** (porta 54321): endpoint GraphQL

**Verificar status dos containers:**

```bash
npx supabase status
```

Este comando exibe as URLs, portas e credenciais (anon key, service role key) necessárias.

**Parar os containers:**

```bash
npx supabase stop
```

### 📦 2) Instalar dependencias

```bash
npm install
```

### 🔐 3) Atualizar variaveis de ambiente

Edite o arquivo `.env` com os valores reais. Use `.env.example` como base.

Campos obrigatorios (TypeORM + PostgreSQL):

- `DATABASE_URL` - Host do banco (ex: 127.0.0.1)
- `DATABASE_PORT` - Porta PostgreSQL (ex: 54322)
- `DATABASE_NAME` - Nome do banco (ex: postgres)
- `DATABASE_USER` - Usuario DB (ex: postgres)
- `DATABASE_PASSWORD` - Senha DB
- `CORS_ORIGIN` - Origem CORS
- `PORT` - Porta NestJS

Campos obrigatorios (Supabase Auth):

- `SUPABASE_URL` - URL do projeto Supabase (ex: http://127.0.0.1:54321)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (para admin)
- `SUPABASE_ANON_KEY` - Anon key (para auth)

**Nota:** A validacao de JWT usa ES256 com JWKS (chaves publicas) via endpoint `/.well-known/jwks.json` do Supabase.

Exemplo com Supabase local:

```dotenv
DATABASE_URL=127.0.0.1
DATABASE_PORT=54322
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
CORS_ORIGIN=http://localhost:3000
PORT=3001
```

**Importante:** Use o comando `npx supabase status` para obter os valores corretos de `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY`.

### 📊 4) Executar migracoes

TypeORM aguarda as migracoes para criar schema do banco:

```bash
npm run migration:run
```

Listar status das migracoes:

```bash
npm run migration:status
```

Se precisar reverter:

```bash
npm run migration:revert
```

### 🚀 5) Rodar o projeto

```bash
npm run start:dev
```

A API estara disponivel em `http://localhost:3001`

### 🧪 6) Rodar testes

```bash
# unitarios
npm run test

# e2e
npm run test:e2e
```

## 🧱 Funcionalidades Implementadas

- **Dominio:** entidades `User`, `Exercise`, `WorkoutPlan`.
- **Value objects:** `sexo`, `objetivo`.
- **Servico de dominio:** `CalorieCalculator`.
- **Casos de uso:** `CreateUser`, `GenerateWorkoutPlan`, `CalculateDailyCalories`, `GetDashboardData`.
- **Infra:** TypeORM repositories implementando interfaces de dominio.
- **Database:** PostgreSQL com TypeORM ORM e migrations automaticas.
- **HTTP:** controllers protegidos com `JwtAuthGuard`.
- **Seguranca:** Helmet, Rate Limit, CORS.
- **Autenticacao:**
  - **Sign-in** (`POST /auth/sign-in`): autentica usuario com email/senha via Supabase Auth
  - **Sign-out** (`POST /auth/sign-out`): invalida sessao e revoga tokens
  - **JWT Strategy**: validacao ES256 com JWKS (chaves publicas do Supabase)
  - **Guards**: protecao de rotas com `JwtAuthGuard` usando tokens do Supabase
- **Validacao:** Zod schemas com exception filter customizado para retornar erros formatados.
- **Testes:** unitarios (10 testes) e E2E (8 testes) cobrindo autenticacao e endpoints protegidos.

## 🔐 Autenticacao

### POST /auth/sign-in

Requer email e senha de usuario cadastrado no Supabase Auth.

```bash
curl --request POST \
  --url http://localhost:3001/auth/sign-in \
  --header 'Content-Type: application/json' \
  --data '{"email":"user@example.com","password":"password123"}'
```

Resposta:

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "expiresIn": 3600,
  "tokenType": "bearer",
  "user": {
    "id": "...",
    "email": "gsilvamedeiros@gmail.com"
  }
}
```

### POST /auth/sign-out

Requer access e refresh tokens obtidos no sign-in.

```bash
curl --request POST \
  --url http://localhost:3001/auth/sign-out \
  --header 'Content-Type: application/json' \
  --data '{"accessToken":"<access>","refreshToken":"<refresh>"}'
```

### Acessar endpoints protegidos

Use o access token no header Authorization:

```bash
curl --request GET \
  --url http://localhost:3001/profile/me \
  --header 'Authorization: Bearer <access_token>'
```

### Detalhes tecnicos

A autenticacao usa:

- **Algoritmo:** ES256 (ECDSA com curva P-256)
- **Validacao:** JWKS via endpoint `/.well-known/jwks.json` do Supabase
- **Biblioteca:** `jwks-rsa` para cache e validacao de chaves publicas
- **Estrategia:** JWT Strategy do Passport com validacao automatica
- **Guards:** `JwtAuthGuard` protege endpoints restritos
- **Schemas:** Zod para validacao de entrada (email/senha)
- **Error handling:** Exception filter customizado para erros de validacao

O token gerado pelo Supabase e valido por 3600 segundos (1 hora).

## � Supabase

### O que é?

Supabase é uma plataforma open-source que fornece backend-as-a-service. Este projeto usa Supabase localmente através de containers Docker, incluindo:

- **PostgreSQL**: banco de dados relacional
- **Auth**: sistema de autenticação (sign-in/sign-up/JWT)
- **REST API**: API automática para as tabelas
- **Studio**: interface visual para gerenciar o banco

### Comandos úteis

```bash
# Inicializar (primeira vez)
npx supabase init

# Iniciar containers
npx supabase start

# Ver status e credenciais
npx supabase status

# Parar containers
npx supabase stop

# Resetar banco de dados
npx supabase db reset
```

### URLs e Portas

Após iniciar com `npx supabase start`, os seguintes serviços estarão disponíveis:

**Development Tools:**

- Studio: `http://127.0.0.1:54323`
- Mailpit (emails): `http://127.0.0.1:54324`
- MCP: `http://127.0.0.1:54321/mcp`

**APIs:**

- Project URL: `http://127.0.0.1:54321`
- REST API: `http://127.0.0.1:54321/rest/v1`
- GraphQL: `http://127.0.0.1:54321/graphql/v1`

**Database:**

- PostgreSQL: `postgresql://postgres:postgres@127.0.0.1:54322/postgres`

### Acessar o Studio

O Studio é a interface visual para gerenciar o Supabase:

```
http://127.0.0.1:54323
```

No Studio você pode:

- Visualizar/editar tabelas
- Gerenciar usuários (Auth)
- Executar queries SQL
- Ver logs em tempo real

### Como funciona

Todos os serviços rodam em containers isolados no seu computador. Os dados ficam persistidos localmente, permitindo desenvolvimento offline sem depender de serviços cloud. As credenciais (anon key, service key, JWT secret) são geradas automaticamente no primeiro start.

## �🗄️ Banco de Dados (TypeORM)

### Entidades TypeORM

As entidades estao em `src/infra/database/typeorm/entities/`:

**UserEntity** (`user.entity.ts`)

```typescript
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column('numeric')
  peso: number;

  @Column('numeric')
  altura: number;

  @Column()
  idade: number;

  @Column()
  sexo: string; // 'masculino' | 'feminino'

  @Column()
  objetivo: string; // 'ganhar_massa' | 'perder_peso' | 'manutencao'

  @CreateDateColumn()
  createdAt: Date;
}
```

**ExerciseEntity** (`exercise.entity.ts`)

```typescript
@Entity('exercises')
export class ExerciseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column('decimal', { precision: 4, scale: 1 })
  met: number; // Metabolic Equivalent of Task

  @Column()
  duracaoMediaMinutos: number;
}
```

**WorkoutPlanEntity** (`workout-plan.entity.ts`)

```typescript
@Entity('workouts')
export class WorkoutPlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  semana: number;

  @Column('jsonb')
  exerciciosPorDia: Record<string, []>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Repositorios TypeORM

Os repositorios em `src/infra/database/typeorm/repositories/` implementam as interfaces de dominio:

**TypeOrmUserRepository**

```typescript
@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(user: NewUser): Promise<User> {
    const entity = this.repository.create(user);
    const saved = await this.repository.save(entity);
    return this.toUser(saved);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { email } });
    return entity ? this.toUser(entity) : null;
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toUser(entity) : null;
  }

  private toUser(entity: UserEntity): User {
    return {
      id: entity.id,
      email: entity.email,
      peso: entity.peso,
      altura: entity.altura,
      idade: entity.idade,
      sexo: entity.sexo,
      objetivo: entity.objetivo,
    };
  }
}
```

**TypeOrmWorkoutRepository**

```typescript
@Injectable()
export class TypeOrmWorkoutRepository implements WorkoutRepository {
  constructor(
    @InjectRepository(WorkoutPlanEntity)
    private repository: Repository<WorkoutPlanEntity>,
  ) {}

  async save(plan: NewWorkoutPlan): Promise<WorkoutPlan> {
    const entity = this.repository.create(plan);
    const saved = await this.repository.save(entity);
    return this.toWorkoutPlan(saved);
  }

  async findByUserAndWeek(
    userId: string,
    semana: number,
  ): Promise<WorkoutPlan | null> {
    const entity = await this.repository.findOne({
      where: { userId, semana },
    });
    return entity ? this.toWorkoutPlan(entity) : null;
  }

  async listByUser(userId: string): Promise<WorkoutPlan[]> {
    const entities = await this.repository.find({ where: { userId } });
    return entities.map((e) => this.toWorkoutPlan(e));
  }

  private toWorkoutPlan(entity: WorkoutPlanEntity): WorkoutPlan {
    return {
      id: entity.id,
      userId: entity.userId,
      semana: entity.semana,
      exerciciosPorDia: entity.exerciciosPorDia as Record<string, []>,
    };
  }
}
```

### Migracoes

As migracoes estao em `src/infra/database/typeorm/migrations/`:

```bash
# Ver status das migracoes
npm run migration:status

# Executar todas nao aplicadas
npm run migration:run

# Gerar migration automatica apos schema change
npm run migration:generate -- --name NomeDaMigracao

# Reverter ultima migracao
npm run migration:revert
```

**Migracoes atuais:**

- `CreateUsersTable` - Tabela users com UUID PK, email unico, campos numericos
- `CreateExercisesTable` - Tabela exercises com MET decimal
- `CreateWorkoutsTable` - Tabela workouts com FK para users, campo JSONB exerciciosPorDia

## 🏛️ Arquitetura Hexagonal

A aplicacao segue tres camadas:

```
┌─────────────────────────────────┐
│    HTTP Controllers (Ports)     │  ← Entrada de requisicoes
├─────────────────────────────────┤
│  Application (Use Cases) Layer  │  ← Logica de orquestracao
├─────────────────────────────────┤
│  Domain Layer (Business Logic)  │  ← Logica pura, independente
├─────────────────────────────────┤
│ Infrastructure (Adapters)       │  ← TypeORM, DB, HTTP clients
└─────────────────────────────────┘
```

### Flow: Requisicao → Resposta

```
1. HTTP Request → Controller
2. Controller injeta Use Case
3. Use Case injeta Domain Service + Repository
4. Domain Service executa logica pura
5. Repository (TypeORM) acessa Database
6. Domain Object retorna ao Use Case
7. Use Case retorna ao Controller
8. Controller formata resposta HTTP
```

### Exemplo: CreateUserUseCase

```typescript
// src/application/use-cases/create-user.use-case.ts
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async execute(input: CreateUserDto): Promise<User> {
    // Validacoes de dominio
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('Email ja existe');
    }

    // Cria novo usuario
    const newUser: NewUser = {
      email: input.email,
      peso: input.peso,
      altura: input.altura,
      idade: input.idade,
      sexo: input.sexo,
      objetivo: input.objetivo,
    };

    // Repository (TypeORM) persiste no banco
    return this.userRepository.create(newUser);
  }
}

// src/infra/http/controllers/profile.controller.ts
@Controller('profile')
export class ProfileController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.createUserUseCase.execute(dto);
  }
}
```

**Beneficios:**

- **Dominio isolado:** sem dependencias de framework
- **Testavel:** mocks faceis de TypeORM repositories
- **Flexivel:** trocar TypeORM por Prisma sem afetar dominio
- **Limpo:** paths aliases (`@domain/`, `@application/`, `@infra/`) tornam imports claros

## 🧭 Rotas e exemplos de uso

Base URL: `http://localhost:{PORT}`

Headers obrigatorios (rotas protegidas):

```http
Authorization: Bearer <jwt>
Content-Type: application/json
```

### 👤 POST /profile

Cria um usuario.

```bash
curl -X POST http://localhost:3001/profile \
  -H "Authorization: Bearer <jwt>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@exemplo.com",
    "peso": 80,
    "altura": 1.75,
    "idade": 30,
    "sexo": "masculino",
    "objetivo": "ganhar_massa"
  }'
```

### 🧾 GET /profile/me

Retorna status simples do perfil.

```bash
curl -X GET http://localhost:3001/profile/me \
  -H "Authorization: Bearer <jwt>"
```

### 🏋️ POST /workouts/generate

Gera um plano de treino.

```bash
curl -X POST http://localhost:3001/workouts/generate \
  -H "Authorization: Bearer <jwt>" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id",
    "semana": 1
  }'
```

### 📊 GET /dashboard

Retorna dados agregados do usuario.

```bash
curl -X GET "http://localhost:3001/dashboard?userId=user-id" \
  -H "Authorization: Bearer <jwt>"
```

## 🧩 Observacoes

- **TypeORM abstrai PostgreSQL:** O dominio nao conhece TypeORM ou banco de dados. Apenas implementacoes nos repositorios falam com TypeORM.
- **Migrations obrigatorias:** Tabelas sao criadas via migrations TypeORM, nao sync automatico.
- **JSONB para arrays:** A coluna `exerciciosPorDia` usa tipo JSONB PostgreSQL para flexibilidade.
- **UUID primary keys:** Todas as tabelas usam UUID v4 como identificadores unicos.
- **Supabase PostgreSQL:** O banco roda localmente em `127.0.0.1:54322` (Supabase Docker local).
