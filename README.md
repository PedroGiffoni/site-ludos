# Clínica Ludos

Site da Clínica Ludos com experiências Three.js, animações ligadas à rolagem e páginas de serviços e cursos.

## Desenvolvimento local

Requer Node.js compatível com Vite 8 (20.19+ ou 22.12+).

```sh
cd site
npm ci
npm run dev
```

O terminal informa o endereço da prévia. No Windows, depois da instalação, também é possível executar `site/INICIAR.cmd`.

```sh
npm test
npm run build
```

O build gera `site/dist/` com as páginas HTML e `site/dist-element/ludos-scene.js` com o componente 3D isolado. A instalação na Wix ainda exige validação no Wix Editor; o build estático não é importado diretamente no editor.

## Estrutura

- `site/src/`: páginas, estilos, conteúdo e cenas.
- `site/public/assets/`: imagens, fontes e vídeo otimizados usados na apresentação.
- `site/wix-demo.html`: demonstração local do contrato do componente, sem comprovar integração na Wix.
- `skills/`: guias específicos do projeto; começar por `skills/ludos-projeto/SKILL.md`.
- `planejamento/`: requisitos de entrega e registro da implementação.
- `elementos/`, `logo/`, `modelos para instagram/`, `MANUAL_LUDOS.pdf`: referências da identidade fornecida para o projeto.

O acervo bruto de fotos, vídeos e fontes e os temporários permanecem locais. Os ativos necessários para executar o site estão incluídos. A regeneração de silhuetas por `site/scripts/prepare-characters.py` requer Python com Pillow; o JSON gerado já está versionado, portanto o desenvolvimento do site não depende dessa etapa.

## Estado das ofertas

- Neuropsicologia: Primeiros Passos — R$ 199, acesso por 12 meses; compra e aulas nos destinos Wix existentes.
- Personalidade e Psicopatologia — inscrições encerradas, página informativa e contato para participantes.

Esta versão está em desenvolvimento. A publicação na Wix, validação clínica do conteúdo, dados profissionais finais e teste autenticado de compra/acesso de aluno permanecem pendentes. Consulte `planejamento/primeira-versao.md`.
