-- ═══════════════════════════════════════════════
-- CORPO NOVO EM 21 DIAS — Schema do Banco de Dados
-- Cole este SQL no Supabase > SQL Editor > New Query
-- ═══════════════════════════════════════════════

-- ── 1. PERFIS ────────────────────────────────────
-- Dados pessoais e início do protocolo
CREATE TABLE IF NOT EXISTS perfis (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome          TEXT,
  peso_inicial  NUMERIC(5,2),
  peso_meta     NUMERIC(5,2),
  altura_cm     INTEGER,
  idade         INTEGER,
  inicio_21dias DATE NOT NULL DEFAULT CURRENT_DATE,
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. CHECK-INS DIÁRIOS ─────────────────────────
-- Peso, água e humor registrados cada dia
CREATE TABLE IF NOT EXISTS check_ins (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data      DATE NOT NULL DEFAULT CURRENT_DATE,
  peso_kg   NUMERIC(5,2),
  agua_ml   INTEGER DEFAULT 0,
  humor     SMALLINT CHECK (humor BETWEEN 1 AND 5),
  nota      TEXT,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, data)
);

-- ── 3. REFEIÇÕES ─────────────────────────────────
-- Registro do que foi consumido
CREATE TABLE IF NOT EXISTS refeicoes (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data      DATE NOT NULL DEFAULT CURRENT_DATE,
  tipo      TEXT NOT NULL CHECK (tipo IN ('cafe','almoco','jantar','lanche')),
  descricao TEXT,
  concluida BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 4. PROGRESSO DOS 21 DIAS ─────────────────────
-- Marca cada dia como concluído
CREATE TABLE IF NOT EXISTS progresso_21dias (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  dia            SMALLINT NOT NULL CHECK (dia BETWEEN 1 AND 21),
  concluido      BOOLEAN DEFAULT FALSE,
  data_conclusao DATE,
  UNIQUE (user_id, dia)
);

-- ── 5. ASSINATURAS ───────────────────────────────
-- Controle de plano e trial via Stripe
CREATE TABLE IF NOT EXISTS assinaturas (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id    TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plano                 TEXT CHECK (plano IN ('trial','mensal','anual')),
  status                TEXT DEFAULT 'trial',
  trial_fim             TIMESTAMPTZ,
  proximo_pagamento     TIMESTAMPTZ,
  criado_em             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id)
);

-- ══════════════════════════════════════════════════
-- ROW LEVEL SECURITY — cada usuária vê só os seus dados
-- ══════════════════════════════════════════════════

ALTER TABLE perfis           ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins        ENABLE ROW LEVEL SECURITY;
ALTER TABLE refeicoes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE progresso_21dias ENABLE ROW LEVEL SECURITY;
ALTER TABLE assinaturas      ENABLE ROW LEVEL SECURITY;

-- Perfis
CREATE POLICY "perfil_proprio" ON perfis
  FOR ALL USING (auth.uid() = id);

-- Check-ins
CREATE POLICY "checkin_proprio" ON check_ins
  FOR ALL USING (auth.uid() = user_id);

-- Refeições
CREATE POLICY "refeicao_propria" ON refeicoes
  FOR ALL USING (auth.uid() = user_id);

-- Progresso
CREATE POLICY "progresso_proprio" ON progresso_21dias
  FOR ALL USING (auth.uid() = user_id);

-- Assinaturas
CREATE POLICY "assinatura_propria" ON assinaturas
  FOR ALL USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════════
-- FUNÇÃO: cria perfil + assinatura automaticamente
-- quando uma nova usuária se cadastra
-- ══════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO perfis (id, nome)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'nome')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO assinaturas (user_id, plano, status, trial_fim)
  VALUES (NEW.id, 'trial', 'trial', NOW() + INTERVAL '7 days')
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Dispara a função a cada novo cadastro
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ══════════════════════════════════════════════════
-- ÍNDICES para performance
-- ══════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_checkins_user_data    ON check_ins (user_id, data DESC);
CREATE INDEX IF NOT EXISTS idx_refeicoes_user_data   ON refeicoes (user_id, data DESC);
CREATE INDEX IF NOT EXISTS idx_progresso_user        ON progresso_21dias (user_id, dia);
CREATE INDEX IF NOT EXISTS idx_assinaturas_stripe    ON assinaturas (stripe_customer_id);
