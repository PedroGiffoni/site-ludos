---
name: ludos-threejs
description: Projetar e implementar personagens e cenas Three.js da Ludos com fidelidade à marca, rolagem coordenada e desempenho adaptativo. Usar para modelagem, materiais, GLB, câmera, carregamento e ciclo de vida do runtime 3D.
---

# Three.js Ludos

Leia [acervo e identidade](../ludos-design/references/identidade-e-acervo.md), [motion](../ludos-motion/SKILL.md) e a fronteira com [Wix](../ludos-arquitetura-wix/SKILL.md). Não construir o site durante a etapa de planejamento. Quando a execução estiver autorizada, resolver primeiro uma cena representativa e sua integração.

## Personagens

O acervo oferece PNGs e uma referência tridimensional no manual, não modelos GLB prontos. Criar volumes a partir das silhuetas com bordas macias, faces e acessórios separados quando precisarem se mover. Preservar proporções, cores, óculos de Fred, tromba/chapéu de Edy e particularidades dos demais. Evitar usar apenas um plano com PNG como se fosse modelagem volumétrica concluída.

Preferir construção procedural simples quando reproduzir fielmente as formas. Usar modelagem externa e GLB quando curvas, acabamento ou rig exigirem; verificar ferramentas disponíveis antes de prometer arquivos modelados. Rasterização, extrusão automática e imagem gerada são referências ou etapas, não garantia de um modelo fiel. Rever frente, três quartos e perfil, inclusive expressões.

Definir origem, escala e pivôs consistentes para poses e transições. Usar rig apenas nos elementos que exigem deformação; não adicionar esqueleto complexo a objetos rígidos. Reutilizar geometrias/materiais sem descarte prematuro de recursos compartilhados.

## Cena e renderização

Iluminação quente e suave, acabamento fosco com volume de brinquedo macio, sem plástico especular excessivo. Manter cores reconhecíveis após iluminação e gerenciamento de cor; consultar a documentação da versão fixada para configurações atuais. Começar com iluminação e sombras econômicas, adicionando pós-processamento apenas se trouxer benefício visual demonstrável.

Câmera e composição devem reservar zonas de texto e CTA. Favorecer projeção e distância que preservem formas sem distorções fortes. Ter enquadramento móvel próprio; personagem não pode desaparecer por simples corte lateral do desktop.

## Contrato do runtime proposto

Separar carregamento, composição e atualização. Interfaces equivalentes a `mount(container, config)`, `setProgress(0..1)`, `setMotionMode(mode)`, `resize(width, height)` e `dispose()` podem orientar a implementação; são contratos do projeto, não métodos oficiais do Three.js.

Um render loop por renderer; não criar um loop por personagem. Compartilhar renderer em uma cena contínua quando a arquitetura real permitir. Se houver elementos separados, controlar quantos contextos ficam ativos, suspender cenas fora de uso e evitar um canvas pesado por cartão.

Dimensionar pelo contêiner com `ResizeObserver` ou mecanismo equivalente. Atualizar câmera e drawing buffer somente quando necessário. Limitar número de pixels renderizados conforme medição, não copiar `devicePixelRatio` irrestrito. Identificar perfis de qualidade e reduzir sombras, texturas, efeitos e densidade antes de sacrificar a clareza da cena. Não detectar qualidade apenas pelo nome do navegador ou user agent.

## Carregamento e falhas

Fixar versão do Three.js e addons compatíveis no lockfile futuro. Usar GLTFLoader quando houver GLB/glTF. Adicionar Draco/Meshopt/KTX2 somente com ganho medido, decoders distribuídos e compatibilidade testada. Medir custo de download e memória descompactada; arquivo pequeno pode consumir muita GPU.

Poster e conteúdo HTML aparecem antes do 3D. Carregamento deve informar falha e apresentar fallback, sem spinner infinito. Abortar ou ignorar respostas de carregamento depois da desmontagem. Tratar perda de contexto WebGL e reentrada sem remover ações da página.

Ao sair, cancelar o loop/tweens, desconectar observadores, remover listeners e liberar materiais, geometrias, texturas, render targets e recursos do renderer conforme propriedade. Remover um objeto da cena não libera sua memória. Verificar descarte e remontagem repetidos.

## Entregáveis e verificação

Produzir catálogo dos modelos e direitos de uso, convenções de pivô/escala, estados do storyboard e relatório de custo por cena. Na implementação, verificar sem WebGL, em conexão lenta, com resize, movimento reduzido e repetidas montagens. Relatar frames e memória medidos com aparelho, resolução e perfil; não chamar 60 fps de comprovados sem observação.

Referências oficiais verificadas em 04/11/2026: [carregamento de modelos](https://threejs.org/manual/pages/loading-3d-models.html), [responsividade](https://threejs.org/manual/pages/responsive.html), [descarte de recursos](https://threejs.org/manual/pages/cleanup.html). Revalidar APIs antes de codificar.
