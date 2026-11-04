# Levantamento de requisitos Ludos

Atualização: 04/11/2026. Status: construção iniciada por autorização do usuário; primeira versão local navegável em `site/`. Ver [entrega inicial](../../../planejamento/primeira-versao.md).

## Confirmado pelo usuário

| Tema | Requisito |
|---|---|
| Site atual | https://www.clinicaludos.com/ |
| Editor | Wix Editor |
| Profissional da clínica | Apenas Paula Joly; docentes dos cursos são apresentados nas respectivas ofertas |
| Marca | Apresentar a clínica e fortalecer sua identidade |
| Atendimento | Crianças e adolescentes; contratação e comunicação com pais/responsáveis |
| Serviços | Psicoterapia e avaliação neuropsicológica |
| Conversão clínica | Contatos por WhatsApp |
| Cursos | Estudantes de psicologia e recém-formados |
| Páginas de cursos indicadas | `/cursos`, `/cursopersonalidadeepsicopatologia` e `/cursoneuropsi`; auditoria detalhada em [cursos.md](cursos.md) |
| Personalidade e Psicopatologia | Manter como encerrado, com página informativa preservada e sem chamadas de compra |
| Neuropsicologia: Primeiros Passos | Oferta atual válida: R$ 199 e acesso por 12 meses; compra e entrega pelo Wix Online Programs |
| Presenciais | Landing page, venda/inscrição online por Eventos Wix, curso presencial |
| Online | Venda no site, vídeos e PDFs hospedados e acessados no Wix Online Programs |
| Preservação | Manter conteúdo e funções atuais com reformulação visual |
| Movimento | Experiência extremamente dinâmica; Three.js; cenas ligadas à rolagem |
| Personagens | Permitida a transformação dos cinco personagens em 3D; acompanhar a página e interagir com elementos |
| Fotografias | Usuário possui imagens e enviará material adicional |
| Referências externas | Nenhuma indicada; desenvolver direção original a partir da marca |
| Sequência | Levantamento de requisitos, montagem da skill, depois construção |

## Direção proposta, ainda sujeita à revisão

Página inicial com narrativa de marca e caminhos claros para atendimento e formação. Páginas próprias para cada serviço e cada oferta de curso, mantendo entrada direta para alunos. O site não deve depender de uma única landing page extensa para todas as intenções de busca.

Manter editor e aplicativos Wix; usar módulos personalizados para as cenas. A integração contínua de rolagem entre módulos ainda exige prova técnica. Não prometer migração integral de código nem substituição automática das interfaces nativas.

## Auditoria pública inicial

Leitura textual de páginas públicas e resultados indexados, complementada por navegação direta nas três páginas de cursos e em seus destinos públicos em 04/11/2026. As aberturas das duas landing pages foram inspecionadas visualmente; não é auditoria visual completa nem inventário do painel Wix. Dados de busca podem estar desatualizados. Fluxos restritos, aulas, checkout e configurações não foram acessados.

| Área/URL | Observação | Tratamento futuro |
|---|---|---|
| `/` | Clínica, especialidades, Paula Joly, depoimentos, WhatsApp e rodapé | Preservar funções; revisar dados e evidências; nova narrativa |
| `/especialidades` | Psicoterapia e avaliação; resquícios de instruções de edição no texto indexado | Corrigir conteúdo e manter páginas de serviço |
| `/psicoterapiainfantojuvenil` | Explicação do processo, participação dos pais e contato | Reescrever com clareza; revisão clínica das afirmações existentes |
| `/avaliacaoneuropsicologica` | Processo, indicações, FAQ e contato | Preservar perguntas úteis; validar duração e informações atuais |
| Link “Psicologa Paula Joly” | Na leitura consultada, apontou para `/cópia-psicoterapia-infantojuvenil` e chegou à avaliação | Conferir no navegador/editor e corrigir destino; não presumir página própria válida |
| `/contatos` | Contato, redes e avaliações | Confirmar telefone, endereço, redes, horários e acesso |
| `/cursos` | Índice público com “Personalidade e Psicopatologia” e “Neuropsicologia Primeiros Passos”; texto de exemplo em inglês indexado | Confirmar catálogo ativo e separar modalidades; remover placeholders |
| `/cursopersonalidadeepsicopatologia` | Online ao vivo via Meet; usa Events; landing anuncia lote inicial, mas destino mostra vendas encerradas | Preservar página e destino; reconciliar modalidade, datas, lotes e disponibilidade |
| `/cursoneuropsi` | Curso gravado; links para Online Programs; formulário de dúvidas e comentários | Preservar formulário, acesso, materiais e certificação; validar dados comerciais |
| Eventos e Programas | Uso confirmado pelo usuário | Inventariar todas as ofertas, URLs, status e jornadas no painel |
| Rodapé | Termos, privacidade e cookies | Preservar destinos; revisar adequação às jornadas e dados atuais |

Fontes consultadas: [início](https://www.clinicaludos.com/), [especialidades](https://www.clinicaludos.com/especialidades), [psicoterapia](https://www.clinicaludos.com/psicoterapiainfantojuvenil), [avaliação](https://www.clinicaludos.com/avaliacaoneuropsicologica), [contato](https://www.clinicaludos.com/contatos), [cursos](https://www.clinicaludos.com/cursos). Consulta em 04/11/2026, com diferentes datas de indexação.

## Requisitos funcionais para detalhamento

- Navegação: clínica, especialidades, Paula Joly, cursos, contato e acesso do aluno.
- WhatsApp: mensagens contextuais para psicoterapia e avaliação; confirmar número. Medir clique como clique, não como consulta contratada.
- Eventos: apresentar data, local, modalidade, conteúdo, docente e inscrição com os dados oficiais da oferta.
- Programas: apresentar conteúdo, docentes, acesso, materiais, preço e condições confirmadas; preservar autenticação, compra e direitos dos alunos existentes.
- SEO: inventariar URLs atuais, preservar ou mapear redirecionamentos e metadados. Não apagar páginas apenas para simplificar o menu.
- Conteúdo: dados mantidos pelo painel Wix sempre que possível; responsável pela manutenção ainda não informado.
- Mídia: selecionar registros reais, confirmar autorização de uso de pessoas identificáveis, produzir versões web sem alterar os originais.
- Medição proposta: cliques por serviço, visualização de cursos, início de inscrição e compras confirmadas quando a integração permitir; não enviar relatos clínicos ou dados de crianças a ferramentas de marketing.

## Pendências para fechar o levantamento

1. Quem atualiza conteúdo no Wix Editor e qual autonomia deseja manter.
2. Registro profissional, biografia e apresentação atualizados de Paula Joly; responsável pela validação clínica. A apresentação da clínica terá apenas Paula, conforme confirmado.
3. Telefone, endereço completo, horários, modalidades de atendimento e política atual de planos/reembolso. Há contatos diferentes no manual e no site.
4. URLs das duas ofertas já fornecidas e destinos públicos identificados. Personalidade permanece encerrado e Neuropsicologia mantém a oferta atual (R$ 199/12 meses), conforme confirmado. Verificar outras ofertas presenciais e demais regras de acesso, certificados e materiais. Não classificar Personalidade como presencial: a página consultada anuncia encontros online ao vivo.
5. Fotos finais e seleção dos vídeos; autorização e contexto dos registros. O acervo de vídeo foi listado, mas ainda não assistido.
6. Prioridade comercial entre atendimento e cursos. Proposta provisória: clínica na abertura, cursos com caminho visível desde o menu e capítulo próprio.
7. Licença de uso web das fontes, sobretudo arquivos Arista marcados como trial; fontes alternativas da própria marca enquanto isso.
8. Validação da direção visual, roteiro de movimento e integração Wix antes de construir o site definitivo.

## Critério de prontidão

O briefing pode orientar exploração visual com pendências explícitas. Para iniciar o site, apresentar ao usuário o roteiro, mapa de páginas, arquitetura recomendada e lista de conteúdos faltantes; obter a conclusão da etapa de requisitos solicitada por ele. A publicação exige validar todos os caminhos e preservar os alunos existentes.
