---
name: ludos-design
description: Definir identidade visual, direção de arte, layout e componentes de interface do site Ludos. Usar para propostas visuais e design responsivo a partir do manual da marca, distinguindo apresentação clínica e formação profissional.
---

# Design Ludos

Esta skill define a direção visual. Para planejar o projeto completo, usar [ludos-projeto](../ludos-projeto/SKILL.md); para coreografia detalhada, [ludos-motion](../ludos-motion/SKILL.md); para modelagem e renderização, [ludos-threejs](../ludos-threejs/SKILL.md). As seções abaixo preservam as restrições compartilhadas, sem substituir os contratos dessas especialidades.

## Contexto e estágio

Leia [o briefing](references/requisitos.md) antes de propor telas ou código. Ele separa requisitos confirmados, propostas e pendências. O usuário autorizou o início do projeto. A construção local está em andamento; consultar o briefing para o estágio atualizado e as pendências de publicação. Não interpretar esta skill como autorização para publicar ou modificar o site Wix.

Os arquivos originais ficam na raiz do projeto, dois níveis acima desta pasta: `MANUAL_LUDOS.pdf`, `elementos/`, `logo/`, `fontes/`, `modelos para instagram/` e `videos/`. Leia [a identidade e o inventário](references/identidade-e-acervo.md) ao escolher ativos. Esta skill depende desse acervo e deve viajar com o projeto.

Ambiente confirmado: Wix Editor. Apresentar apenas Paula Joly como profissional da clínica. Isso não exclui docentes convidados das páginas de cursos; Artur Menezes aparece nas duas ofertas analisadas. Leia [a auditoria dos cursos](references/cursos.md) antes de alterar seu catálogo, textos ou CTAs.

Estados comerciais confirmados: Personalidade e Psicopatologia permanece como encerrado, sem CTA de compra ou chamada de primeiro lote; Neuropsicologia: Primeiros Passos permanece disponível por R$ 199 com acesso por 12 meses. Preservar a página informativa do curso encerrado e os acessos de alunos. Não criar anúncio de próxima turma ou lista de espera sem definição real.

## Decisões de design

- Construir uma experiência extremamente dinâmica, imersiva e ligada à rolagem. Three.js é uma escolha explícita do usuário. Usar os personagens originais como protagonistas recorrentes, deslizando pela página e interagindo com objetos da marca.
- Equilibrar afeto, ciência, cooperação e brincar. A comunicação de atendimento fala com pais e responsáveis por crianças e adolescentes. A comunicação dos cursos fala com estudantes de psicologia e profissionais recém-formados.
- Usar os personagens em volume macio, preservando silhuetas, cores, feições e identificação. A página 17 do manual já apresenta uma referência tridimensional. Não substituir a marca por mascotes genéricos ou deformar o logotipo para animá-lo.
- Usar base creme, cores da marca e composições amplas. Criar contraste entre cenas expansivas, leitura e registros reais da clínica. Não aplicar estética de brinquedoteca a toda a área de formação profissional.
- Separar os caminhos de atendimento, cursos presenciais e programas online com rótulos inequívocos. Preservar acesso direto à área do aluno.

## Conteúdo e conversão

Leia [o roteiro e os critérios](references/experiencia.md) ao planejar capítulos, interações e landing pages. Usar benefícios compreensíveis, processo transparente, evidências verificáveis e CTAs contextualizados. Mostrar uma ação principal por bloco; oferecer o segundo percurso sem competir com todos os botões.

Não inventar números, credenciais, depoimentos, resultados, vagas ou urgência. Não usar medo, culpa dos pais, diagnóstico por questionário promocional ou garantia de melhora. Textos clínicos devem ser validados pela responsável da clínica antes da publicação. Os dados do site antigo são material para revisão, não confirmação de atualidade.

## Wix e viabilidade

Preservar Wix Events e Online Programs, incluindo compra, inscrições, login, vídeos e PDFs. A hipótese de implementação é manter o site no Wix Editor e incorporar módulos Three.js como Custom Elements, preservando as páginas nativas transacionais. É uma recomendação técnica ainda não validada no editor da conta. Não equiparar aplicativo e modalidade: Events também atende curso online ao vivo. Separar modalidade (presencial, online ao vivo, gravado), disponibilidade de inscrição e ferramenta de entrega.

Não converter todo o site para Headless: a documentação consultada em 04/11/2026 lista Online Programs como não suportado. Revalidar a documentação antes de decisões de implantação. A existência de Custom Elements não comprova controle global do scroll da página Wix. Validar futuramente, em uma página de teste, coordenadas, alturas, comportamento sticky, toque, carregamento e descarte do canvas. Não manipular o DOM interno da Wix por seletores frágeis.

Manter texto, links, títulos e ações em HTML acessível; o canvas não pode ser o único portador do conteúdo. Se uma cena contínua exigir hospedagem separada, apresentar esse compromisso ao usuário e preservar os cursos Wix antes de mudar a arquitetura.

## Movimento e verificação

Projetar uma coreografia entre capítulos, não apenas entradas de cartões. Descrever para cada cena: personagem, objeto, ação, progresso de rolagem, conteúdo associado e alternativa móvel/reduzida.

Manter rolagem nativa e reversível. Evitar prender o usuário numa sequência obrigatória, cobrir botões com o personagem ou exigir hover. Disponibilizar pausa/redução de movimento e respeitar `prefers-reduced-motion`; remover deslocamentos de câmera e parallax nesse modo. Não usar flashes ou áudio automático.

Carregar conteúdo e poster antes da cena 3D; carregar modelos e vídeos sob demanda. Reduzir resolução, sombras e efeitos conforme o aparelho. Suspender renderização fora da tela e liberar recursos. Sem WebGL, exibir composição estática e manter todos os caminhos funcionais.

Antes da entrega futura, verificar no celular e desktop: leitura, teclado, movimento reduzido, retorno pela rolagem, acesso ao WhatsApp, inscrição em evento, compra e acesso a programa com vídeo/PDF. Validar o percurso transacional no ambiente apropriado sem realizar cobrança real sem autorização. Não prometer desempenho ou aumento de conversão sem medição.
