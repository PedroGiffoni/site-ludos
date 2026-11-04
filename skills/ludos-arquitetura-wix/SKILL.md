---
name: ludos-arquitetura-wix
description: Definir e implementar a arquitetura frontend da Ludos no Wix Editor com Custom Elements e aplicativos nativos preservados. Usar para limites de componentes, contratos Velo, integração de rolagem, empacotamento e estratégia de entrega.
---

# Arquitetura Ludos no Wix Editor

Leia [requisitos](../ludos-design/references/requisitos.md) e [cursos](../ludos-design/references/cursos.md). Trabalhar no Wix Editor confirmado pelo usuário. O usuário autorizou a construção local; consultar o briefing para o estágio atualizado. Não confundir essa autorização com publicação ou mudanças na conta Wix.

## Fronteiras propostas

- Wix Editor: navegação, texto indexável, CTAs, formulários e conteúdo que o responsável precisa editar.
- Custom Elements: cenas e interações Three.js, com CSS e dependências encapsulados. Usar componentes web/TypeScript como preferência inicial; não impor React ou um aplicativo Next.js inteiro dentro do editor sem necessidade demonstrada.
- Wix Events: páginas e inscrições dos eventos, inclusive quando a modalidade for online ao vivo.
- Wix Online Programs: autenticação, compra, permissão de acesso, etapas, vídeo/PDF e certificação já existentes. Não replicar autorização de alunos no frontend.
- URLs comerciais: preservar conforme referência; o site novo não deve substituir destinos nativos por botões simulados.

Headless não é o caminho assumido: Online Programs estava na lista de incompatíveis consultada. Revalidar antes de qualquer proposta de migração. Não tratar snippets no painel de código personalizado como importação de um site inteiro.

## Separação de módulos para a futura construção

Propor contratos equivalentes a: conteúdo/configuração pública, elemento web, controlador de cena, adaptador de progresso, preferências de movimento e gerenciamento de recursos. Não criar essas pastas antecipadamente só por esta skill. O controlador 3D deve aceitar progresso normalizado e tamanho do contêiner; não depender do DOM privado do Wix.

Produzir bundle JavaScript adequado ao carregamento do elemento, com dependências fixadas e arquivos HTTPS acessíveis. Confirmar formato de bundle, CSP, CORS, caminhos de modelos/texturas e estratégia de cache no ambiente real. Segredos e credenciais nunca entram no bundle.

## Contrato de integração proposto

Velo pode enviar atributos por `$w(...).setAttribute()` e receber eventos do elemento por `.on()`. Validar sintaxe e suporte na documentação da versão usada. Atributos sugeridos, não APIs Wix prontas:

| Campo público | Semântica |
|---|---|
| `scene-id` | Identifica a composição a carregar |
| `motion-mode` | `full`, `reduced` ou `paused` |
| `progress` | Número serializado entre 0 e 1, somente se a origem real de progresso estiver comprovada |
| `quality` | Perfil de qualidade escolhido pela aplicação |

Eventos sugeridos: `ludos-ready` e `ludos-error`, com dados mínimos sem informações pessoais. CTAs preferencialmente como links nativos/HTML com destino explícito. Nunca aceitar URL arbitrária recebida de mensagem ou atributo para redirecionamento privilegiado.

## Prova técnica obrigatória antes de escalar a implementação

Em página de teste autorizada, documentar uma cena que ocupa parte de duas seções: como recebe progresso, onde o canvas existe, como mantém tamanho e qual comportamento tem no celular. Não supor que ScrollTrigger dentro de iframe mede a rolagem do documento pai. Eventos de entrada no viewport não equivalem a progresso contínuo. Não sondar a árvore interna da Wix por IDs gerados.

Verificar carregamento e layout no ambiente publicado de teste; editor/preview podem apresentar diferenças. Testar entrada/saída da página, navegação interna, redimensionamento, mudança de orientação, carregamento tardio, desmontagem e novo acesso. Se não houver forma estável de acompanhar toda a página, registrar limite e oferecer cenas locais conectadas visualmente ou outra arquitetura; não reduzir silenciosamente a ambição aprovada nem prometer resultado ainda não provado.

## Entregável

Decisão arquitetural com diagrama simples, responsabilidades, contratos, URLs preservadas, dependências e versões, plano de teste, limitações e instruções de integração específicas ao Wix Editor. Quando autorizado a publicar, preparar versão identificável e retorno à versão anterior; registrar o que realmente foi instalado e testado.

Fontes técnicas verificadas em 04/11/2026: [Custom Elements no Editor](https://support.wix.com/en/article/wix-editor-adding-a-custom-element-to-your-site), [setAttribute](https://dev.wix.com/docs/velo/velo-only-apis/$w/custom-element/set-attribute), [eventos do elemento](https://dev.wix.com/docs/velo/velo-only-apis/$w/custom-element/on), [compatibilidade Headless](https://support.wix.com/en/article/wix-headless-supported-and-unsupported-apps). Reconsultar quando implementar APIs.
