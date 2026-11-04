# Identidade e acervo

Fonte: manual original de 28 páginas, extraído e revisado visualmente em 04/11/2026. As folhas de contato de revisão estão em `tmp/brand-review/` na raiz do projeto; não são ativos de produção.

## Fundamentos

Cooperação, ciência, atividades lúdicas e afetividade (páginas 3–4). Assinatura recorrente: “Cuidando da infância”. O atendimento adolescente deve aparecer no conteúdo, sem alterar automaticamente a assinatura da marca.

## Cores do manual, página 8

| Nome | Valor |
|---|---|
| Verde Piquenique | `#AFC8A0` |
| Rosa Amoroso | `#F3B4B4` |
| Azul Cuidadoso | `#8DD1DC` |
| Amarelo Sorridente | `#FFD86E` |
| Laranja Solar | `#FBB277` |
| Bege Praiano claro | `#FFF6DE` |
| Bege Praiano | `#FFEEC9` |
| Preto Protetor | `#303030` |

O preto está impresso como `#303030z`, valor inválido em CSS; `#303030` é a normalização proposta. A aparência das imagens exportadas pode diferir dos códigos. Adotar os códigos do manual como referência, sem recolorir os originais indiscriminadamente. Cores pastel não garantem contraste para texto: verificar cada par.

## Tipografia

Fontes locais: Lato, Comfortaa (chamada “Conforta” no manual) e Arista. Proposta: Comfortaa para títulos, Lato para leitura e interface. Arista somente após confirmar licença adequada; os arquivos locais têm “trial” no nome. Não assumir que a presença do TTF concede uso web. Manter o logotipo como ativo da marca, sem tentar reconstruí-lo digitando seu nome.

## Personagens e objetos

| Personagem/objeto | Arquivo em `elementos/` |
|---|---|
| Grupo | `ELEMENTOS_LUDOS-03.png` |
| Fred nerd, amarelo com óculos | `ELEMENTOS_LUDOS-04.png` |
| Amora Amor, rosa | `ELEMENTOS_LUDOS-05.png` |
| Zoe Zoeira, verde | `ELEMENTOS_LUDOS-06.png` |
| Golfinho | `ELEMENTOS_LUDOS-07.png` |
| Jr, azul | `ELEMENTOS_LUDOS-08.png` |
| Edy Elefante, laranja | `ELEMENTOS_LUDOS-09.png` |
| Ondas | `ELEMENTOS_LUDOS-10.png` |
| Lua | `ELEMENTOS_LUDOS-11.png` |
| Arcos | `ELEMENTOS_LUDOS-12.png`, `ELEMENTOS_LUDOS-13.png` |
| Flor | `ELEMENTOS_LUDOS-14.png` |
| Traços de pássaros | `ELEMENTOS_LUDOS-15.png` |
| Cacto | `ELEMENTOS_LUDOS-16.png` |
| Montanha | `ELEMENTOS_LUDOS-17.png` |
| Forma radial escura | `ELEMENTOS_LUDOS-18.png` |

Não atribuir significados clínicos ou especialidades a personagens como se fossem oficiais. A página 17 do manual mostra aplicação tridimensional dos cinco, útil para orientar volumes e material. Os PNGs não são modelos 3D: a modelagem ainda será necessária. Não há GLB, GLTF ou SVG identificado no acervo original.

## Inventário

Acervo inicial: 18 PNGs de elementos, 18 PNGs de logos, 21 PNGs de modelos sociais e 21 TTFs. Há variantes de logo coloridas, brancas, pretas e reduzidas. Selecionar a variante por contraste, respeitando proporções.

O diretório `videos/` passou a conter MP4, MOV, HEIC e JPG durante a conversa. O inventário exato está em `planejamento/inventario-midia.csv`, na raiz, com tamanho e hash para localizar duplicados. Há arquivos de aproximadamente 84 MB; não usar originais pesados diretamente na página. Listagem e hash não constituem revisão de enquadramento, áudio, pessoas ou direitos. Inspecionar visualmente antes de escolher os trechos.

Fotografias dos ambientes aparecem também no manual (páginas 25–26), mas as versões diagramadas não substituem fotos originais para o novo site.

Durante a construção, surgiu a pasta `fotos/` com 28 arquivos de ambientes e imagens temáticas. Uma folha de contato foi revisada em `tmp/brand-review/fotos-sheet.jpg`; a primeira versão local utiliza três registros de ambientes em galeria. Nenhum retrato identificado de Paula foi encontrado nessa revisão; sua imagem e biografia continuam pendentes. Ver `planejamento/primeira-versao.md` na raiz para os derivados efetivamente usados.
