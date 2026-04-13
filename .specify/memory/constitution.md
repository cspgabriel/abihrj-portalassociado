# Portal do Associado Hot isRIO Constitution
<!--
Sync Impact Report

Version change: [UNSET] -> 1.0.0
Modified principles:
- [PRINCIPLE_1_NAME] -> I. Especificação Antes do Código (Spec-First)
- [PRINCIPLE_2_NAME] -> II. Testes Primeiro (TDD obrigatório)
- [PRINCIPLE_3_NAME] -> III. Entregas Incrementais e Independentes
- [PRINCIPLE_4_NAME] -> IV. Observabilidade e Versionamento
- [PRINCIPLE_5_NAME] -> V. Segurança e Gestão de Segredos
Added sections:
- Segurança e Conformidade
- Development Workflow
Removed sections: none
Templates requiring review: .specify/templates/spec-template.md ✅, .specify/templates/plan-template.md ✅, .specify/templates/tasks-template.md ✅
Follow-up TODOs:
- RATIFICATION_DATE is unknown and left as TODO(RATIFICATION_DATE)
-->

## Core Principles

### I. Especificação Antes do Código (Spec-First)
Todas as features começam por uma especificação executável e priorizada. A especificação
é a fonte da verdade para escopo, critérios de aceitação e testes. Nenhuma implementação
mergeada deve omitir uma `spec.md` associada que descreva cenários de usuário, critérios
de aceitação mensuráveis e casos de teste independentes.

### II. Testes Primeiro (TDD obrigatório)
TDD é obrigatório: testes (unitários/contract/integracao) são escritos primeiro e devem
falhar antes de qualquer implementação. Cada comportamento novo tem pelo menos um
teste automatizado que valida o critério de aceitação.

### III. Entregas Incrementais e Independentes
Entregas são pequenas, independentes e verificáveis: cada user story priorizada (P1/P2/…)
deve poder ser implementada, testada e demonstrada isoladamente. Evitar grandes
commits monolíticos que misturem várias histórias.

### IV. Observabilidade e Versionamento
Aplicar logs estruturados, métricas e rastreamento onde fizer sentido. Releases seguem
versionamento semântico (MAJOR.MINOR.PATCH). Quebras compatibilidade só ocorrem
com mudança de MAJOR e documentação de migração obrigatória.

### V. Segurança e Gestão de Segredos
Segredos e chaves NÃO entram no repositório. Variáveis sensíveis devem viver em
`.env.local` (ex: GEMINI_API_KEY) ou serviço de secret manager. Scans de dependências
e análise estática de segurança são obrigatórios nas pipelines.

## Segurança e Conformidade
Requisitos mínimos:

- Não commitar credenciais (tokens, chaves privadas). Use `.gitignore` e validações pre-commit.
- Exigir dependabot/renovate ou equivalente para atualizações de dependências e alertas.
- Executar análise de segurança (SCA) e linting de segurança em CI (ex.: npm audit, snyk, trivy).
- Definir política de retenção de dados e conformidade com privacidade (se aplicável).

## Development Workflow

- Branching: cada feature em branch `###-feature-name` seguindo templates do Spec Kit.
- Pull Requests: títulos claros, link para `spec.md`, checklist de PR com testes e CI verde.
- Revisão: mínimo 1 aprovação técnica + CI verde para merge; mudanças de arquitetura
	(impacto amplo) exigem 2 aprovações e um design doc.
- CI: todos os PRs devem executar testes unitários, linters e checks de segurança antes do merge.
- Commit messages seguem convensão (ex.: `feat:`, `fix:`, `docs:`, `chore:`) para histórico legível.

## Governance

Amendamentos à constituição:

- Proposta via Pull Request que atualize esta `constitution.md` e descreva a razão da
	mudança e plano de migração (quando aplicável).
- Aprovação mínima: 2 revisores (ou 1 + aprovação de maintainer) e CI verde. Para mudanças
	que alterem princípios fundacionais (remoção/renomeação), considerar MAJOR bump.
- Versionamento da constituição segue semântica:
	- MAJOR: redefinição de princípios ou remoção de políticas essenciais;
	- MINOR: adição de novas seções/princípios;
	- PATCH: clarificações, correções tipográficas, formatação.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): specify original adoption date | **Last Amended**: 2026-04-07
