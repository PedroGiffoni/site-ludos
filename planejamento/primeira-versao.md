# Primeira versão navegável Ludos

Construção autorizada pelo usuário com “vamos iniciar o projeto”. Esta autorização substitui o estágio anterior de planejamento. Não houve publicação nem alteração na conta Wix.

## Arquivos e execução

O código está em `site/`. Executar nessa pasta:

```powershell
npm.cmd install
npm.cmd run dev
```

Também é possível iniciar pelo arquivo `site/INICIAR.cmd` após a instalação das dependências. O terminal informa o endereço local disponível. Para compilar e verificar:

```powershell
npm.cmd test
npm.cmd run build
```

O build gera `site/dist/` com página inicial e cinco páginas HTML adicionais, e `site/dist-element/ludos-scene.js` com o componente 3D independente. Dependências fixadas em `package-lock.json`.

## Implementado nesta versão

- Página inicial responsiva: apresentação, universo da marca, serviços, espaço real da clínica, apresentação tipográfica de Paula, cursos, FAQ e contato.
- Páginas `/psicoterapiainfantojuvenil`, `/avaliacaoneuropsicologica`, `/cursoneuropsi`, `/cursopersonalidadeepsicopatologia` e `/cursos`.
- Cinco personagens em geometria extrudada com volume e recursos faciais, derivados das silhuetas originais. É uma primeira interpretação em relevo 3D, não modelagem orgânica definitiva ou rig completo.
- Cena única com posições ligadas à rolagem, movimentos secundários, pequenos objetos cênicos e transições entre áreas reservadas. A integração ao scroll global funciona na prévia local e ainda não foi comprovada na Wix.
- Alternativa estática quando WebGL falha e controle de redução de movimento; preferência do sistema respeitada.
- FAQ nativo, menu móvel, diálogos de serviços e vídeo local por ação do usuário.
- Galeria de ambientes a partir da pasta `fotos/`, identificada durante a implementação, com visualização ampliada.
- Neuropsicologia com preço/acesso confirmados e links reais de compra e aluno para Wix; Personalidade encerrado, sem oferta de primeiro lote ou compra.
- Conteúdo das páginas internas no HTML do build, sem depender de JavaScript para sua leitura. Links de serviço seguem para as páginas mesmo sem o script de diálogos.

## Mídia utilizada

| Derivado | Origem | Tratamento |
|---|---|---|
| Logo, personagens e elementos WebP | PNGs das pastas de marca | Recorte pela transparência e redimensionamento; originais preservados |
| `clinica.webp` | `videos/RCM_1864.jpg` | Redimensionamento; foto de ambiente sem pessoas, revisada visualmente |
| `clinica-tour.mp4` | `videos/Estrutura geral.mp4` | Trecho de 3 a 15 segundos, sem áudio; aproximadamente 0,90 MB |
| `tour-poster.webp` | Mesmo vídeo, segundo 7 | Quadro de apresentação |
| `recepcao.webp`, `sala.webp`, `detalhes.webp` | `fotos/RCM_1851-Aprimorado-NR.png`, `RCM_1949.png`, `RCM_1982.png` | Versões web dos ambientes, após revisão em folha de contato |

Foi inspecionada uma folha de oito amostras do vídeo de estrutura, cobrindo início, meio e final aproximado. A seleção usada apresenta os ambientes da clínica. Os demais vídeos do acervo não foram revisados nesta versão. Nenhum original foi enviado a um serviço externo.

## Integração Wix: preparado e pendente

`site/wix-demo.html` permite testar localmente o componente contido com atributos `scene-id`, `motion-mode` e `progress`. Não representa teste dentro do editor Wix. O bundle inclui Three.js e as silhuetas, sem buscar modelos externos.

Para uma prova autorizada na Wix: hospedar o bundle em HTTPS, adicionar Custom Element com tag `ludos-scene`, definir `layout=contained`, altura explícita e `scene-id=hero`. Testar no ambiente publicado de teste. O elemento aceita atributos por Velo, mas ainda é necessário definir e provar a origem estável do progresso de rolagem na Wix; não há adaptador global Wix implementado.

Os conteúdos continuam no editor e os cursos permanecem nos aplicativos nativos. Não importar `dist/` como se o Wix Editor fosse uma hospedagem de arquivos estáticos. O layout da prévia precisa ser aplicado ao Wix; o bundle transfere apenas a cena 3D.

## Verificação

- Build Vite e pacote separado do componente compilados com sucesso.
- Quatro testes automatizados: limites/reversão do progresso, normalização, oferta encerrada sem checkout e oferta ativa com preço/acesso/destino corretos.
- Navegador local: renderização 3D observada em desktop e celular; menu móvel e diálogo de serviço verificados; páginas dos dois cursos conferidas com estados e destinos corretos.
- Componente isolado: troca para a cena Fred e alteração para movimento reduzido verificadas; controle global de movimento e abertura do vídeo também verificados no navegador. Nenhum erro de console retornado na conferência final.
- Não houve login, envio de formulário, mensagem WhatsApp, compra ou teste de direitos de aluno.
- Three.js gera um chunk de aproximadamente 603 kB minificado (151 kB gzip), carregado separadamente. O aviso de tamanho do build permanece; metas de desempenho de campo não foram medidas.

## Antes da publicação

Confirmar telefone/endereço e dados profissionais de Paula; incluir fotografia e biografia final; revisar texto clínico; selecionar demais mídias; validar licença web das fontes; reintegrar formulário e demais conteúdo do site antigo no Wix; testar login, compra e acesso de aluno em ambiente apropriado. O formulário de dúvidas continua acessível por link à página Wix atual; não há backend de formulário novo nesta prévia.

Esta é uma versão de implementação para revisão visual. Não comprova preservação completa do site antigo nem prontidão de publicação.

## Revisão das páginas de cursos

Após o retorno do usuário sobre a simplicidade das páginas internas, as duas ofertas ganharam landing pages próprias em `site/src/course-pages.js` e `site/src/course-style.css`:

- Neuropsicologia: abertura com Fred e órbitas 3D, público, percurso horizontal de quatro eixos ligado à rolagem em desktop, experiência de estudo, docente, investimento, FAQ e acesso do aluno.
- Personalidade: abertura com Amora e órbitas 3D, fio condutor, sequência de cinco conceitos com visual fixado durante a rolagem em desktop, modelos de estudo, docente e suporte à turma encerrada.
- As quatro partes do percurso são uma organização editorial dos temas existentes, não módulos oficiais novos. No celular e no modo reduzido aparecem em sequência vertical; com movimento reduzido no desktop, em grade.
- Mantidos R$ 199/12 meses em Neuropsicologia e ausência de compra/evento em Personalidade. A página principal mantém sua direção visual.

Verificados no navegador: aberturas desktop/celular, renderização 3D, percurso, ausência de rolagem horizontal indevida e conteúdo do modo reduzido. O retrato de Artur continua representado por composição tipográfica, enquanto não há foto aprovada no acervo local. Não houve alteração na Wix.

## Revisão das páginas clínicas

Direção aprovada pelo usuário e implementada em `site/src/service-pages.js`, `service-style.css` e `service-motion.js`.

- Psicoterapia: Amora em 3D com flores e arco, narrativa de acolher/expressar/construir vínculos, cena central fixa em desktop, capítulos sobre infância e adolescência, composição familiar com três personagens, fotos reais, primeiros passos e FAQ.
- Avaliação: Fred em 3D com uma rede espacial de pontos e curvas, mapa interativo de cinco dimensões com explicações, cena central fixa com etapas gerais do processo, composição de potencialidades/contexto/história/desafios, fotos e FAQ.
- Os componentes usam a geometria e as proporções dos personagens já existentes. Imagens de ambiente usam recorte por `object-fit`, sem alterar a proporção das figuras da marca.
- O mapa cognitivo é informativo e não coleta dados; funciona por botão, teclado e toque. Sem JavaScript, todas as explicações permanecem no HTML.
- A coreografia usa rolagem nativa; no celular, os capítulos são verticais. Movimento reduzido retira a fixação, parallax e animações contínuas, mantendo conteúdo e ações.

Conferidos no navegador desktop/celular: cenas das duas páginas, mapa alternando Memória/Linguagem e painel correspondente, modo reduzido, ausência de overflow horizontal e links WhatsApp específicos de psicoterapia. Nenhum erro ou aviso retornado na conferência final do navegador. Textos descrevem um processo geral; detalhes de atendimento continuam sujeitos à revisão clínica antes de publicação. A Wix não foi alterada.
