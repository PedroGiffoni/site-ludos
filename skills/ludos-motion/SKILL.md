---
name: ludos-motion
description: Criar storyboard e coreografia de motion graphics para a Ludos, com personagens acompanhando a rolagem e interagindo com os elementos da marca. Usar para timelines, transições, microinterações e adaptações móvel/reduzida.
---

# Motion graphics Ludos

Leia [direção visual](../ludos-design/SKILL.md) e [roteiro](../ludos-design/references/experiencia.md). Para limites da rolagem no Wix, consultar [arquitetura](../ludos-arquitetura-wix/SKILL.md). A experiência desejada é extremamente dinâmica; não entregar apenas fade-ins ou cartões subindo como substituto dessa direção.

## Linguagem de movimento

Personagens com peso aparente, antecipação breve, aceleração e pouso macio. Usar arcos, flor, ondas, montanha e formas reais da marca como objetos cênicos. Criar passagens entre capítulos: Edy desliza por um arco, o grupo abre espaço para a foto real e Fred acompanha o capítulo de formação. São propostas de encenação, não significados oficiais dos personagens.

Alternar ação expressiva e composição estável para leitura. Um protagonista guia cada momento. Um leve movimento secundário pode manter vida na cena, mas texto, foco e botão não devem fugir do usuário. Não animar o logotipo de forma que distorça sua assinatura.

## Contrato do storyboard

Para cada cena entregar uma ficha com:

- intenção narrativa e conteúdo/CTA que permanece visível;
- personagem, objetos, pose inicial e final;
- enquadramentos de entrada, meio e saída;
- intervalo normalizado do capítulo e o que ocorre ao rolar para trás;
- o que depende de tempo e o que depende de progresso;
- área reservada para texto e interfaces fixas;
- alternativas desktop, toque, movimento reduzido e falha de WebGL;
- dependências de modelos, fotos, vídeo e prova Wix.

Não atrelar a coreografia a valores de pixels de uma única tela. Trechos fixados precisam de altura e saída explícitas para não criar espaços vazios nem capturar o scroll. A leitura e navegação devem funcionar em salto por âncora, recarga no meio da página e retorno do histórico.

## Implementação futura

GSAP/ScrollTrigger é uma opção para coordenar timelines após validar sua relação com o contêiner de rolagem real. Usar `gsap.matchMedia()` quando apropriado para diferenças de tamanho e preferência; não recomendar o antigo `ScrollTrigger.matchMedia()` como primeira escolha. Reverter animações e remover observadores/listeners ao desmontar. Evitar dois motores escrevendo a mesma transformação da mesma entidade.

Movimento ligado ao scroll deve mapear progresso para estado de forma determinística; pequenas expressões autônomas podem usar tempo limitado. Evitar física aleatória para conduzir a navegação: rolar para trás deve recuperar uma composição previsível. Recalcular limites após mudança de layout sem reiniciar a página ou saltar o usuário.

Não substituir rolagem nativa por deslocamento obrigatório. Não usar hover como único gatilho; toque e teclado têm alternativa. No modo reduzido, eliminar viagens de câmera, parallax, saltos e movimento contínuo; oferecer poses estáticas com a mesma informação. Controle de pausa/redução deve alcançar todas as cenas, não apenas CSS.

## Aceitação

Exigir continuidade visível, silhuetas reconhecíveis, textos legíveis e nenhuma colisão com CTAs ou banner de cookies. Comparar o storyboard com os estados reais em celular e desktop. Avaliar também rolagem rápida, reversão, menu de âncoras e orientação horizontal. Não declarar acessibilidade integral apenas por detectar uma media query.

Referências verificadas em 04/11/2026: [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [gsap.matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/), [W3C — animação de interações](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). O critério de interação citado é AAA; controle de movimento também é um requisito próprio deste projeto.
