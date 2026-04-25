# AI IDE — Roadmap de Implementação (Cursor Parity)

Implementar uma feature por vez. Após cada implementação: abrir o programa e testar.
Comando para abrir: `cd ai-engineering-system/desktop && npm start`

---

## 🔴 ALTA PRIORIDADE

### 1. Diff Side-by-Side + Aceitar por Linha
**Status:** [x] Concluído
**O que é hoje:** Overlay simples com texto +/- (unified diff), aceitar tudo ou rejeitar tudo.
**O que o Cursor faz:** Side-by-side com syntax highlight, aceitar/rejeitar linha por linha, diff durante streaming.
**Arquivos a modificar:**
- `desktop/index.html` — novo painel de diff side-by-side
- `desktop/renderer.js` — função `showDiff()`, adicionar Monaco diff editor
- `desktop/style.css` — estilos do novo diff
**Como testar:** Abrir arquivo, pedir à IA para editar, verificar se o diff aparece lado a lado com syntax highlight.

---

### 2. Diagnósticos em Tempo Real
**Status:** [x] Concluído
**O que é hoje:** Só analisa quando o usuário clica em "Diagnose Code". Usa IA para encontrar problemas.
**O que o Cursor faz:** Analisa enquanto digita (debounced), mostra erros inline no editor, quick-fix com um clique.
**Arquivos a modificar:**
- `desktop/renderer.js` — `validateCurrentFile()` já existe mas é básico, expandir com análise IA debounced
- `desktop/main.js` — handler `diagnostics:analyze` já existe, adicionar modo incremental
**Como testar:** Abrir um arquivo com erro proposital, verificar se aparece sublinhado em tempo real.

---

### 3. Ghost Text Mais Rápido + Multi-linha
**Status:** [x] Conclu�do
**O que é hoje:** 800ms de delay, mostra só a primeira linha da sugestão, Tab aceita tudo.
**O que o Cursor faz:** 50-100ms, mostra múltiplas linhas em ghost text, aceita palavra por palavra.
**Arquivos a modificar:**
- `desktop/renderer.js` — `scheduleGhostText()`, reduzir delay para 150ms, mostrar multi-linha
- `desktop/main.js` — handler `ai:tabComplete`, melhorar prompt para completions mais curtas e rápidas
**Como testar:** Abrir arquivo, começar a digitar uma função, verificar se sugestão aparece rápido e em múltiplas linhas.

---

### 4. Inline Edit com Streaming
**Status:** [x] Conclu�do
**O que é hoje:** Popup simples, espera resposta completa, mostra diff depois.
**O que o Cursor faz:** Streaming em tempo real no próprio editor, preview enquanto a IA gera.
**Arquivos a modificar:**
- `desktop/renderer.js` — `applyInlineEdit()`, adicionar streaming
- `desktop/main.js` — handler `ai:inlineEdit`, adicionar suporte a `onChunk`
- `desktop/preload.js` — expor canal `inlineEdit:stream`
**Como testar:** Selecionar código, Ctrl+K, digitar instrução, verificar se o código aparece sendo gerado em tempo real.

---

### 5. Agent Loop com Rollback em Falha
**Status:** [x] Conclu�do
**O que é hoje:** Sequencial, para em erro, sem desfazer o que já fez.
**O que o Cursor faz:** Rollback automático se falhar, estratégias alternativas, checkpoints por iteração.
**Arquivos a modificar:**
- `src/agent/loop.ts` — adicionar rollback via checkpoints, estratégias de retry
- `desktop/main.js` — handler `agent:loop`, passar callbacks de progresso
**Como testar:** Dar um goal impossível ao loop, verificar se os arquivos voltam ao estado original.

---

### 6. Compose Multi-arquivo Inteligente
**Status:** [x] Conclu�do
**O que é hoje:** Lista plana de arquivos, sem detectar conflitos, sem criar pastas.
**O que o Cursor faz:** Cria estrutura de pastas, detecta conflitos, preview editável antes de criar.
**Arquivos a modificar:**
- `desktop/renderer.js` — `runCompose()`, `runComposeAndCreate()`, adicionar preview editável e detecção de conflitos
- `desktop/main.js` — handler `ai:compose`, melhorar prompt para gerar estrutura de pastas
**Como testar:** Pedir para compor um projeto completo, verificar se cria pastas e detecta arquivos existentes.

---

## 🟡 MÉDIA PRIORIDADE

### 7. Git Completo (Staging + Diff por Arquivo + Branch Switch)
**Status:** [x] Conclu�do
**O que é hoje:** Só status + commit + push. Sem staging, sem diff por arquivo, sem trocar branch.
**O que o Cursor faz:** Stage/unstage arquivos individualmente, diff de cada arquivo modificado, trocar branch, histórico de commits.
**Arquivos a modificar:**
- `desktop/index.html` — expandir painel Git com staging area
- `desktop/renderer.js` — novas funções git (stage, unstage, checkout, log)
- `desktop/main.js` — novos handlers git (git:stage, git:checkout, git:log, git:diff)
**Como testar:** Modificar arquivo, abrir painel Git, verificar staging area e diff.

---

### 8. Search & Replace
**Status:** [x] Conclu�do
**O que é hoje:** Só busca, sem replace, sem fuzzy, sem histórico.
**O que o Cursor faz:** Busca + replace com preview, fuzzy search, histórico de buscas, excluir padrões.
**Arquivos a modificar:**
- `desktop/index.html` — adicionar campo replace no painel search
- `desktop/renderer.js` — `searchFiles()`, adicionar replace e fuzzy
- `desktop/main.js` — handler `search:inFiles`, adicionar replace
**Como testar:** Buscar um termo, substituir em todos os arquivos, verificar preview antes de aplicar.

---

### 9. Terminal com Tab Completion + Múltiplos Terminais
**Status:** [x] Conclu�do
**O que é hoje:** Um terminal, sem tab completion, histórico não persiste.
**O que o Cursor faz:** Múltiplos terminais em abas, tab completion para comandos e arquivos, histórico persistente.
**Arquivos a modificar:**
- `desktop/index.html` — abas de terminal
- `desktop/renderer.js` — sistema de múltiplos terminais, tab completion
- `desktop/main.js` — múltiplas instâncias de spawn
**Como testar:** Abrir dois terminais, usar Tab para completar comandos.

---

### 10. Chat com Histórico Persistente + Chips de Sugestão
**Status:** [x] Conclu�do
**O que é hoje:** Histórico só em memória (perde ao fechar), sem sugestões rápidas.
**O que o Cursor faz:** Histórico salvo em disco, chips de sugestão contextuais, exportar conversa.
**Arquivos a modificar:**
- `desktop/renderer.js` — salvar/carregar histórico, adicionar chips
- `desktop/main.js` — handler para persistir histórico em JSON
- `desktop/index.html` — UI dos chips de sugestão
**Como testar:** Fechar e reabrir o programa, verificar se o histórico do chat foi preservado.

---

### 11. Checkpoints Automáticos + Timeline
**Status:** [x] Conclu�do
**O que é hoje:** Checkpoint manual antes de cada edição, só mostra contagem.
**O que o Cursor faz:** Checkpoint automático a cada save, timeline visual, diff entre checkpoints, nomes.
**Arquivos a modificar:**
- `desktop/renderer.js` — checkpoint automático no save, UI de timeline
- `desktop/index.html` — painel de timeline de checkpoints
- `desktop/main.js` — handler checkpoint com timestamps e nomes
**Como testar:** Editar arquivo várias vezes, abrir timeline, restaurar versão específica.

---

### 12. Contexto com Grafo de Dependências
**Status:** [x] Conclu�do
**O que é hoje:** RAG por keywords, inclui todos os arquivos sem priorizar.
**O que o Cursor faz:** Analisa imports/requires para saber quais arquivos são relevantes, prioriza arquivos recentes.
**Arquivos a modificar:**
- `src/context/manager.ts` — adicionar análise de imports
- `src/rag/index.ts` — indexar dependências entre arquivos
- `desktop/renderer.js` — `buildIDEContext()`, incluir arquivos importados pelo arquivo ativo
**Como testar:** Abrir arquivo que importa outros, pedir à IA para explicar, verificar se ela menciona os arquivos importados.

---

## 🟢 MENOR PRIORIDADE

### 13. ESLint/Prettier Integrado
**Status:** [x] Conclu�do
**O que é hoje:** Validação básica de tamanho e naming conventions.
**O que o Cursor faz:** ESLint e Prettier rodando em tempo real, quick-fix, batch fix.
**Arquivos a modificar:**
- `desktop/main.js` — handler para rodar ESLint/Prettier via CLI
- `desktop/renderer.js` — mostrar erros ESLint no editor
**Como testar:** Abrir arquivo JS com erro de lint, verificar se aparece sublinhado.

---

### 14. Sistema de Extensões Funcional
**Status:** [x] Conclu�do
**O que é hoje:** Salva ID no JSON, não executa nada.
**O que o Cursor faz:** Extensões `.js` locais com comandos reais, painéis customizados, integração com editor.
**Arquivos a modificar:**
- `desktop/main.js` — executar comandos das extensões
- `desktop/renderer.js` — registrar comandos no command palette
- `desktop/extensions/example-extension.js` — exemplo funcional
**Como testar:** Criar extensão simples que adiciona um comando, verificar se aparece no command palette.

---

### 15. Settings Workspace vs User
**Status:** [x] Conclu�do
**O que é hoje:** Settings globais salvas no .env.
**O que o Cursor faz:** Settings por workspace (`.ai-ide/settings.json`) e globais, com validação e descrições.
**Arquivos a modificar:**
- `desktop/main.js` — carregar settings por workspace
- `desktop/renderer.js` — UI de settings expandida
- `desktop/index.html` — nova seção workspace settings
**Como testar:** Abrir dois projetos diferentes, verificar se cada um tem suas próprias settings.

---

## Ordem de Implementação Recomendada

1. ✅ Diff Side-by-Side (impacto visual imediato)
2. ✅ Diagnósticos em Tempo Real (feedback imediato)
3. ✅ Ghost Text Rápido (autocomplete funcional)
4. ✅ Inline Edit Streaming (edição fluida)
5. ✅ Git Completo (workflow essencial)
6. ✅ Search & Replace (produtividade)
7. ✅ Chat Persistente (UX)
8. ✅ Agent Loop Rollback (confiabilidade)
9. ⬜ Compose Inteligente (multi-arquivo) — PRÓXIMO
10. ⬜ Terminal Múltiplo (produtividade)
11. ⬜ Checkpoints Timeline (segurança)
12. ⬜ Contexto Dependências (qualidade IA)
13. ⬜ ESLint/Prettier (qualidade código)
14. ⬜ Extensões Funcionais (extensibilidade)
15. ⬜ Settings Workspace (configuração)

---

## Status Atual: 8/15 implementados (53%)

**Core features do Cursor implementadas:**
- Diff side-by-side com Monaco DiffEditor
- Diagnósticos em tempo real com quick-fix
- Ghost text rápido (150ms) multi-linha
- Inline edit com streaming
- Agent loop com rollback automático
- Git staging, diff por arquivo, branch switch
- Search & replace com preview
- Chat history persistente

**Próximas prioridades:**
- Compose inteligente (detectar conflitos, criar pastas)
- Terminal múltiplo com tab completion
- Checkpoints automáticos com timeline
