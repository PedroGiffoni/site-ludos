# Experiência, narrativa e conversão

Direção proposta: “Um mundo de cuidado que acompanha cada descoberta”. Frase de trabalho, não slogan aprovado. A marca torna-se um ambiente navegável; os personagens criam continuidade entre capítulos.

## Roteiro da página inicial

| Capítulo | Conteúdo e ação | Coreografia proposta |
|---|---|---|
| 1. Boas-vindas | Explicitar psicoterapia e avaliação para crianças e adolescentes; CTA “Conversar sobre atendimento”; link “Conhecer os cursos” | Grupo 3D chega à composição; Edy começa a deslizar pelo percurso lateral; texto e CTA disponíveis antes do 3D |
| 2. Como podemos ajudar | Dois serviços com descrição compreensível e links próprios | Personagem desce por arco da marca e pousa ao lado do serviço em foco; conteúdo não depende da animação |
| 3. Conheça o espaço | Registros reais selecionados, acolhimento e estrutura verificáveis | Flor e montanha se abrem como moldura; personagem conduz a galeria, sem cobrir imagens; vídeo por ação do usuário |
| 4. Como começa o cuidado | Contato, conversa inicial e próximos passos confirmados pela equipe | Personagens aproximam objetos em três etapas; acompanhar o progresso sem transformar o processo em promessa de prazo |
| 5. Conheça Paula Joly | Apresentação, formação e abordagem verificadas de Paula, única profissional da clínica a destacar | Grupo se organiza em composição estável; retrato e credenciais ganham prioridade |
| 6. Aprender com a Ludos | Catálogo com modalidade e disponibilidade por oferta: presencial, online ao vivo ou gravado | Fred percorre formas que sugerem páginas; linguagem visual mais editorial para estudantes e profissionais |
| 7. Dúvidas e contato | FAQ, localização, contato e acesso aos cursos | Personagens se reencontram; movimento desacelera junto da decisão final |

Não fixar esta ordem se o inventário, a hierarquia comercial ou a validação com o usuário indicarem alternativa. Priorizar continuidade entre cenas; não animar todos os elementos simultaneamente.

## Landing pages de cursos

Criar uma página por oferta com: proposta de aprendizagem concreta, público, conteúdo, docente e credenciais, modalidade, data/local ou acesso online, materiais, preço e condições confirmadas, FAQ e CTA para o fluxo Wix correto. Separar claramente ingresso presencial de acesso a aulas online. Mostrar acesso do aluno sem obrigar quem já comprou a passar pela venda novamente.

Consultar [a auditoria dos cursos](cursos.md). Preservar as URLs indicadas pelo usuário e seus destinos Wix. Não manter chamada de compra em oferta encerrada: propor estado “Inscrições encerradas” e, se houver processo real autorizado, interesse em próximas turmas. Events não significa necessariamente presencial; Personalidade usa Events para encontros online ao vivo. Preservar o formulário de dúvidas de Neuropsicologia e os docentes convidados, mesmo com apenas Paula na apresentação clínica.

Usar prova verificável: currículo real, programa, imagens e eventualmente trechos autorizados. Urgência apenas quando existir prazo ou lotação reais. Não inventar promessa de renda, domínio profissional ou reconhecimento de certificado. Confirmar regras de certificado antes de anunciá-lo.

## Texto e hierarquia

Pais: tom acolhedor e objetivo; explicar o serviço e o primeiro passo sem presumir diagnóstico da criança. Evitar apelos que culpem os responsáveis. Exemplo de abertura para revisão: “Cuidado psicológico para crianças e adolescentes. Acolhimento e escuta para sua família dar o próximo passo.”

Cursos: linguagem adulta e específica, com programa e evidências antes de adjetivos. Exemplo para revisão: “Conheça os cursos da Ludos para sua formação em psicologia”. Só usar afirmações sobre aplicação prática quando o programa confirmar essa entrega.

Converter por clareza: oferta reconhecível, ação visível, menos dúvidas e menos atrito. Não tratar técnicas de marketing como garantia de conversão. Testes futuros podem comparar texto e posição de CTA após existir volume de dados suficiente.

## Requisitos de movimento

- Coordenar a cena ao progresso real da rolagem; permitir reversão suave ao subir a página.
- Um protagonista por momento; personagens secundários em movimentos discretos. Material macio e iluminação quente, sem estética metálica ou neon alheia à marca.
- Deslocar objetos por trajetórias deliberadas; evitar rotação infinita de todos os elementos. As interações devem orientar atenção e revelar relações entre capítulos.
- No celular, enquadrar cenas em áreas próprias, reduzir objetos e efeitos, manter o percurso expressivo. Não simplesmente encolher a versão desktop.
- Com movimento reduzido ou WebGL indisponível: mostrar cenas estáticas coerentes; manter todo o conteúdo, navegação e ações.
- Sem áudio automático; vídeos com controles e alternativa textual relevante. Não exigir assistir ao vídeo para entender a oferta.

## Critérios de aceitação para a futura implementação

| Dimensão | Evidência esperada |
|---|---|
| Marca | Silhuetas, cores e logotipos reconhecíveis; sem deformação acidental |
| Clareza | Abertura informa atendimento e público; cursos e área do aluno encontrados diretamente |
| Acessibilidade | Navegação por teclado, foco visível, texto selecionável, contraste verificado, controles de movimento |
| Resiliência | Sem 3D, todos os caminhos continuam disponíveis |
| Wix | Alturas, sticky e comunicação com rolagem testados no site de teste publicado, não apenas no preview |
| Performance | Metas propostas: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 no percentil 75 quando houver dados reais; antes disso, medições de laboratório são aproximações |
| Compra | Evento leva à inscrição correta; programa leva à compra e ao acesso correto, com vídeo e PDF para aluno autorizado |
| Preservação | Inventário de URLs e funcionalidades reconciliado com o site e o painel; sem remoções silenciosas |

Metas de performance são objetivos de projeto, não resultados já medidos. Ajustar densidade e efeitos quando o custo visual prejudicar interação ou leitura.

## Fontes técnicas verificadas em 04/11/2026

- [Custom Elements no Wix Editor](https://support.wix.com/en/article/wix-editor-adding-a-custom-element-to-your-site): arquivos JavaScript, Velo/HTTPS, requisitos de domínio/plano e diferenças entre preview e site publicado.
- Editor confirmado pelo usuário: Wix Editor. A documentação de Studio não deve orientar ações na conta como se fosse o mesmo ambiente.
- [Compatibilidade Wix Headless](https://support.wix.com/en/article/wix-headless-supported-and-unsupported-apps): Events suportado; Online Programs e Video não suportados na lista consultada.
- [Caminhos Headless](https://dev.wix.com/docs/go-headless/get-started/choose-your-development-path): distingue hospedagem Wix e hospedagem própria; não equivale a importar código no editor visual.
- [Core Web Vitals e experiência de página](https://developers.google.com/search/docs/appearance/core-web-vitals) e [PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about): métricas e distinção entre dados reais e laboratório.
