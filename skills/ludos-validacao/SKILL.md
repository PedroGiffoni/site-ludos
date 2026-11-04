---
name: ludos-validacao
description: Verificar a experiência Ludos de ponta a ponta, incluindo acessibilidade, movimento, desempenho e preservação das jornadas Wix. Usar para revisar protótipos, builds, integração, regressão e prontidão de publicação.
---

# Validação e entrega Ludos

Leia [requisitos](../ludos-design/references/requisitos.md), [ofertas](../ludos-design/references/cursos.md) e a [arquitetura](../ludos-arquitetura-wix/SKILL.md). Usar a implementação e o ambiente realmente disponíveis. Não tratar planejamento como site testado e não realizar transações reais para completar uma lista de checks.

## Evidência por jornada

| Jornada | Resultado verificável |
|---|---|
| Pais | Encontram serviço correto, entendem próximo passo e abrem destino WhatsApp com número confirmado; não enviar mensagem sem autorização |
| Clínica | Paula é a única profissional apresentada; dados, retrato e credenciais correspondem ao material validado |
| Catálogo | Modalidade, público e estado da oferta claros; sem texto de exemplo |
| Personalidade | Inscrições encerradas em todos os pontos; sem primeiro lote, CTA de compra ou nova turma inventada |
| Neuropsicologia | R$ 199 e 12 meses apresentados; destino Online Programs correto; login e compra preservados |
| Aluno existente | Acesso direto aos direitos já adquiridos, vídeo e PDF/material sem nova compra indevida; verificar com acesso de teste autorizado |
| Evento presencial futuro | Fluxo Events preservado e modalidade explícita; não inventar oferta ativa |
| Formulário | Campos e integração preservados; testar envio somente com dados de teste e autorização apropriada |

Checkout público e área autenticada são camadas diferentes. Em ambiente sem acesso, registrar exatamente até onde chegou; usar teste/sandbox quando disponível. Não abrir listas de participantes ou dados de alunos se não necessários ao teste.

## Matriz de apresentação

Verificar celular e desktop, teclado e toque, movimento completo/reduzido/pausado, rolagem rápida e reversa, âncoras e retorno pelo histórico. Incluir banner de cookies, menu aberto, orientação diferente e zoom de texto. Não usar screenshots de um tamanho como prova de responsividade completa.

Texto e ações devem sobreviver a JavaScript/3D indisponíveis. Verificar foco visível, ordem de leitura, títulos, nomes acessíveis, contraste e toque. Nenhum CTA pode ser coberto por canvas/personagem ou depender exclusivamente de hover. Ajustes de movimento devem alcançar também o render loop e as animações 3D.

## Desempenho e estabilidade

Usar as metas propostas em [experiência](../ludos-design/references/experiencia.md). Distinguir laboratório de dados reais e registrar aparelho/viewport, conexão, cache e qualidade da cena. Uma nota Lighthouse isolada não prova metas no percentil 75.

Verificar conteúdo antes do 3D, pesos de modelos/vídeo, carga tardia, layout estável, resoluções da GPU, perda de contexto e remontagem. Procurar loops duplicados e crescimento de recursos ao navegar repetidamente. Relacionar falhas ao efeito observável; não otimizar por contagem arbitrária de polígonos sem medição.

## Integração e publicação

Testar no site Wix publicado de teste autorizado: preview e localhost não comprovam comportamento real de Custom Elements. Conferir HTTPS, ativos, cache, erros, dimensões, sticky e origem do progresso. Verificar o destino de todos os links preservados e redirecionamentos planejados.

Antes da publicação autorizada, reunir build/versionamento, instruções de aplicação no Wix Editor, mapa de URLs, conteúdo aprovado, configurações necessárias, evidências e caminho de retorno. Não solicitar aprovação de uma abstração: deixar a versão revisável e limitações explícitas. Nenhuma publicação está autorizada apenas pela criação das skills.

## Relatório

Entregar status por jornada: aprovado com evidência, falhou com reprodução ou não testado com motivo. Priorizar defeitos que bloqueiem compra/acesso, contato, leitura e movimento seguro. A validação estrutural das skills não substitui esses testes do site.

Fontes de referência: [PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about), [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals), [animação de interações](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). Revalidar requisitos de ferramentas quando executar os testes.
