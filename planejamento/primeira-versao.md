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

## Parque contínuo na página inicial — developer-1

Edy sai da composição da abertura e acompanha a página por um corredor lateral de brinquedos. O percurso é calculado pela posição de rolagem, sem sair lateralmente e reaparecer entre as seções. Inclui saltos entre plataformas e bolas, arcos e dois trechos de tobogã com bordas. Ao subir a página, o mesmo percurso é refeito em sentido inverso.

Implementação em `site/src/home-park.js`, `park-path.js` e `home-park.css`, integrada ao renderer existente. A escala do personagem é uniforme para preservar as proporções. A trajetória tem continuidade nas junções; três testes específicos cobrem aterrissagens, salto/reversão e extremos do escorregador, totalizando sete testes.

O conteúdo da página inicial reserva espaço à direita para o parque, com corredor menor no celular. A alternativa reduzida mantém composições estáticas e restaura a largura de leitura. Fora da abertura, o parque renderiza por eventos de rolagem, sem loop contínuo enquanto o visitante está parado. Páginas internas continuam com suas cenas próprias.

Verificação visual local em desktop e celular: percurso, objetos, ausência de corte lateral do personagem após ajuste, ausência de overflow da página e dos cartões de serviço, controle de movimento reduzido e console sem erros. A prévia não equivale à integração da rolagem na Wix, que segue pendente. Alterações de trabalho feitas na branch `developer-1`.

## Modelos vetoriais e acrobacias — developer-1

Os cinco personagens agora usam curvas do arquivo original `elementos/ELEMENTOS_LUDOS.ai`, substituindo o contorno obtido por imagem. Corpos têm extrusão, bordas arredondadas e acabamento físico; rosto e acessórios são peças separadas. A escala permanece uniforme. Arquivos GLB exportados em `site/public/models/` podem ser inspecionados em `/modelos.html`, com arraste, zoom, seleção e botões de acrobacia.

O parque recebeu plataformas arredondadas, bolas com detalhes, tobogãs abertos com bordas e suportes. A trajetória alterna cambalhotas, giros e estrelinhas completos, com reação dos acessórios e olhos na aterrissagem. Cinco testes de trajetória mais quatro testes existentes cobrem continuidade, extremos e rotações. A conferência visual incluiu carregamento dos cinco GLBs, desktop e celular; corrigida a largura do canvas e margem móvel para evitar corte lateral. Nenhuma alteração publicada na Wix.

Regeneração: `prepare-vector-characters.py` requer PyMuPDF; `npm run models` exporta os GLBs a partir do JSON vetorial. O site usa o JSON já gerado e não depende de Python para executar. Os GLBs são carregados sob demanda apenas no ateliê.

## Tubos fechados com acrílico

Os dois tobogãs agora têm seção circular completa: casco traseiro com revestimento interno, janela frontal curva transparente, vedações, colares e parafusos nas emendas. Reflexos alongados e material com clearcoat dão leitura de acrílico. O personagem percorre o eixo da tubulação, atrás do painel transparente, com escala uniforme suavemente reduzida durante a descida. A frente transparente não projeta sombra opaca sobre o boneco. Plataformas têm pés e ferragens; bolas têm bases em camadas e detalhes em relevo. O corredor móvel foi ampliado para acomodar o diâmetro dos tubos.

Conferidos no navegador: personagem visível dentro dos tubos em desktop e celular, sem erros de console. Dez testes passaram, incluindo fechamento das junções entre casco e acrílico em curvas; build concluído com aviso já conhecido do tamanho do módulo Three.js. Trabalho local na developer-1.

## Pousos e pausas nos apoios

Altura dos tampos calculada pela base real da geometria de Edy, com plataformas alargadas para apoiar os pés. Blocos, bolas e personagem compartilham o mesmo plano de profundidade. Para as bolas, o contato usa os vértices do personagem contra a superfície esférica, considerando o espaço entre os pés. Os saltos reservam 14% do intervalo antes da saída e 14% após a chegada para repouso no apoio. A curva vertical começa subindo e termina descendo; as rotações só ocorrem após o impulso e terminam antes da aterrissagem. Tobogãs preservados.

Conferido visualmente o repouso sobre o tampo no navegador. Onze testes passaram e build concluído. Trabalho local na developer-1.

## Saída dos tobogãs — developer-2

A transição após cada trecho de tubo agora faz uma pausa curta e segue uma descida suave e monotônica até o próximo apoio. Não aplica impulso vertical, cambalhota ou estrelinha nessa saída. A entrada e a trajetória dentro dos cilindros permanecem iguais, assim como os saltos entre plataformas. Teste específico cobre as duas saídas, verificando pausa, ausência de subida e rotações, continuidade e chegada; 12 testes passaram e build concluído.

## Escorregador com escada — developer-2

A primeira bola foi substituída por um parquinho com escada de degraus alternados, patamar superior, corrimãos, rampa com espessura, bordas arredondadas, suportes e pés. Paleta e materiais seguem os demais brinquedos Ludos. Foram inseridas duas etapas na trajetória: cambalhota curta do patamar para a entrada da rampa e descida pelo mesmo caminho usado para gerar a geometria. A saída da rampa continua sem impulso para cima. Os demais obstáculos mantêm sua ordem e tipos originais.

Conferido o novo brinquedo no navegador desktop e a largura de página móvel. Teste específico cobre a cambalhota, a chegada à entrada, a descida sem salto e a continuidade da saída. Treze testes passaram; build concluído. Alterações locais na developer-2, sem nova publicação.

## Patamar nivelado e giro horizontal nas saídas

Patamar do parquinho e início da rampa compartilham a mesma altura e um único tampo. O quique usa altura própria menor, faz uma cambalhota e retorna à entrada no mesmo nível antes da descida. Nas saídas dos dois tubos fechados, a trajetória continua monotônica para baixo e completa uma rotação de 360° no eixo vertical (yaw), sem mortal ou impulso para cima. A saída do escorregador aberto não recebe esse giro. Treze testes passaram, incluindo altura de retorno do quique e eixos/ângulos dos giros dos dois tubos; build concluído. Alterações locais na developer-2.

## Balanço final e acabamento de sombras — developer-2

O último patamar foi substituído por balanço com estrutura em A, travessa arredondada, pés, ferragens, cordas e assento chanfrado. O pouso usa a base do modelo; após a chegada, assento e personagem compartilham o mesmo movimento pendular. A oscilação continua por tempo enquanto o balanço está visível e o visitante permanece na chegada; ao retornar pelo percurso, o pêndulo para e o personagem retoma a posição da rolagem. O loop contínuo fica restrito à abertura ou ao balanço ativo; é suspenso em aba oculta e no modo de movimento reduzido.

Sombras mudaram para VSM com filtragem e maior resolução (1024 móvel, 2048 desktop), ajuste de bias e maior limite de densidade de pixels. A superfície fina da rampa aberta não recebe sombras de mapa para evitar padrões de auto-sombreamento sobre a malha; iluminação e volume das bordas permanecem. No celular, o balanço tem espaço próprio entre o texto e os personagens do contato.

Verificados no navegador: oscilação sem rolagem em capturas sucessivas, posição desktop/celular, controle de movimento reduzido e console sem erros/avisos. Teste de movimento pendular cobre continuidade e contato do boneco com o assento. Quinze testes passaram. Alterações locais na developer-2.

## Alternância Fred / Amora — developer-2

A cada entrada na página inicial, o percurso alterna Fred (amarelo) e Amora (rosa), começando por Fred quando não há histórico. A última escolha é persistida no armazenamento local do navegador; páginas internas não consomem uma alternância. O retorno à home restaurada pelo cache de navegação também troca o personagem. Se o navegador bloquear o armazenamento, a experiência continua com Fred.

O início do percurso usa a posição do personagem escolhido na composição da abertura. Escala uniforme e contato são recalculados com os limites reais de cada modelo para acomodar ambos em plataformas, tubos e balanço. A troca por restauração da página libera geometrias e materiais do parque anterior. Verificada alternância no navegador por recarregamento e ambos os modelos no balanço; console sem erros. Dezessete testes passaram e build concluído. Trabalho local, ainda sem novo commit/deploy.

## Brinquedos apoiados nas divisões visuais

O balanço ampliado no desktop agora encosta com a base real da geometria no início do rodapé. A escada e a rampa abertas são reposicionadas como um conjunto para que sua base coincida com o início da seção de cuidado, na mudança de cor. As três âncoras do personagem (patamar, quique e saída da rampa) recebem o mesmo deslocamento, preservando os contatos. O alinhamento usa os limites reais da malha, sem estimar uma margem visual. O balanço móvel preserva o espaço próprio já aprovado.

Dezoito testes passaram, incluindo alinhamento da base sem alteração de escala. Build concluído. Ajustes locais na developer-3.

## Entradas dos tubos sem plataforma

Removidos os blocos e tampos das duas âncoras imediatamente anteriores aos tubos fechados. Essas âncoras continuam definindo a boca do tubo, mas não geram brinquedos sobrepostos. O movimento de chegada não mantém a pausa de aterrissagem de uma plataforma; segue direto para dentro do cilindro. Mantido o patamar próprio do escorregador com escada. Dezenove testes passaram e build concluído. Alteração local na developer-3.
