# Registro de decisões — Catálogo navegável

**Data do checkpoint:** 30/10/2026  
**Branch:** `codex/catalogo-navegavel`  
**Branch local de integração atual:** `dev` (sem envio ao remoto)
**Referência:** [SPEC-CATALOGO-NAVEGAVEL.md](./SPEC-CATALOGO-NAVEGAVEL.md)

## Dia 1 — confirmação de premissas e governança

| Tema | Decisão | Estado |
|---|---|---|
| Objetivo e escopo | Transformar o site em catálogo consultivo, sem carrinho, checkout, pagamento ou envio de pedidos pelo site; manter navegação, detalhes e FAQ. | Aprovado |
| Preços | Continuam visíveis nos detalhes dos produtos. | Aprovado |
| Contato | Manter WhatsApp, Instagram e email como canais institucionais; sem mensagem de produto pré-preenchida ou transmissão de dados/pedido pelo site. | Aprovado |
| Fonte dos produtos | O JSON do catálogo ficará dentro do repositório, junto ao site, em vez de ser mantido no GitHub Gist. | Aprovado; atualizar especificação e implementação |
| Imagens | A proposta é copiar para `public/images/produtos/` as fotos já usadas pelos produtos e ajustar as referências no JSON local para caminhos como `/images/produtos/nome-da-foto.webp`. Assim o site carrega JSON e fotos do próprio deploy; não depende do Gist para os metadados nem para baixar as imagens. Os nomes e associações de fotos, produtos e variações devem ser preservados. | Proposta para confirmar após inventário das fotos e do JSON |
| Rota antiga | `/carrinho` direciona para a home do catálogo. | Aprovado |
| Aprovação | Preview deve ser aceito pelo cliente antes da publicação em produção. | Aprovado |
| Preview e publicação | Projeto/domínio informado: https://spinning-joias.vercel.app/. A pessoa responsável por aprovar a publicação é o cliente. | Confirmado |
| Canal de decisão | WhatsApp. As aprovações e decisões relevantes também serão registradas neste arquivo. | Confirmado |

## Resultado do checkpoint

Escopo, preços, canais institucionais, rota antiga e aprovação do Preview estão confirmados. O JSON passa a ser local ao repositório. A estratégia de imagens está descrita acima e será validada contra o inventário real antes de atualizar as referências. O projeto/domínio Vercel e o canal de decisão foram informados.

## Dia 2 — mapeamento e inventário

| Verificação | Resultado |
|---|---|
| Catálogo local e referências | 53 produtos; 139 ocorrências e 120 URLs únicas no snapshot de `gist_produtos/produtos-spinning_joias.json`; o hook ainda busca o Gist remoto. |
| Fotos de origem | 134 arquivos, 73.961.054 bytes (70,5 MiB): 56 JPG, 50 JPEG, 28 PNG; dimensões de 300×400 a 1204×1600 px. |
| Correspondência por nome | 1 de 120 URLs únicas coincide diretamente com um arquivo local. Não fazer renomeação/cópia automática; mapear associação por produto e variação com conferência visual na sessão 3. |
| Rotas | React Router v6. `/carrinho` deve redirecionar a `/` via `<Navigate replace>`; preservar acesso direto/refresh de `/produto/:id` e validar fallback SPA no Preview Vercel. Projeto não contém regra de rewrite explícita. |
| Referências de ecommerce | Distribuídas por bootstrap/contexto, cabeçalho/menu, componentes de produto, página/componentes de carrinho, FAQ/assets, utilitários e testes; busca encontrou menções em 24 arquivos de produção. |
| Evidência detalhada | [`INVENTARIO-SECAO-2.md`](./INVENTARIO-SECAO-2.md) |

**Estado:** mapeamento concluído. A tabela de equivalência das imagens fica como dependência da sessão 3; a baixa correspondência nominal torna insegura qualquer migração automática.

## Dia 3 — cópia das fotos e medição inicial/final

| Medida | Resultado |
|---|---:|
| Arquivos copiados para `public/images/produtos/` | 134 de 134 |
| Bytes copiados | 73.961.054 (70,5 MiB) |
| Integridade SHA-256 | 134 comparados; 0 divergências |
| Working tree antes | 1.774.113 bytes |
| Working tree após a cópia | 75.735.167 bytes |
| Variação observada | +73.961.054 bytes |
| Pasta de origem | Preservada, sem alterações |

A cópia preservou nomes e extensões originais. Não foram excluídos arquivos: a equivalência entre as URLs e os arquivos precisa ser consolidada antes de classificar assets como não usados. A lista final de imagens referenciadas e a redução líquida ficam pendentes da reconciliação do JSON na sessão 4. A medição exclui `.git/` e `node_modules/`.

### Ajuste de seleção — imagens de conjuntos não referenciadas

A revisão dos 53 produtos e das referências no app confirmou zero produtos, URLs ou menções a `conjunto`. Removidas somente as 19 cópias `conjunto-*` de `public/images/produtos/` (9.360.255 bytes); todos os 19 originais continuam em `spinning_fotos/`.

| Medida final | Resultado |
|---|---:|
| Destino | 115 arquivos / 64.600.799 bytes |
| Working tree (sem `.git/` e `node_modules/`) | 66.376.857 bytes |
| Working tree antes da sessão 3 | 1.774.113 bytes |
| Variação líquida até aqui | +64.602.744 bytes |

A medição de 134 arquivos foi o estado intermediário anterior à retirada das 19 cópias. A reconciliação completa URL → arquivo continua na sessão 4; não se afirma redução líquida enquanto essa análise estiver em andamento.

### Estado da reconciliação de imagens

A triagem e o descarte seguro das 19 cópias de conjuntos foram feitos. A equivalência completa das 120 URLs não foi confirmada: 119 nomes remotos não batem literalmente com nomes locais e as variantes usam aliases diferentes. Tentativas de abrir o JSON Gist e imagem Blob Vercel pela ferramenta web e um acesso HTTP ao Blob falharam por indisponibilidade/resolução do host. Assim, as 115 fotos continuam como candidatas e nenhum asset adicional foi removido por inferência. Exemplos sem confirmação visual: colar prata maciço, brinco prata com zircônia ruby, fotos extras dos colares duplos e detalhes da shoulder bag.

**Status da sessão 3: parcialmente concluída.** A conferência URL → arquivo e o fechamento da lista final exigem que as referências remotas ou cópias visuais estejam acessíveis.

### Correção do critério de associação — instrução do cliente

A partir da orientação do cliente, a relação foto→produto é feita pelo **nome do arquivo e pelo título do produto no JSON**, considerando tipo, material, design e cor. Portanto, os 19 arquivos `conjunto-*` foram restaurados a `public/images/produtos/` quando seu nome/design/cor corresponde ao produto do catálogo (por exemplo, conjunto dourado duplo com duas patinadoras → produto #35; conjuntos de colar de resina por cor → produtos #9/#10). A marca `conjunto` não os exclui automaticamente; a observação do CSV informa quando a foto mostra peças combinadas.

Uma segunda comparação SHA-256 confirmou uma duplicata exata: `colar-dourado-patinadora-zirconia_rubi.jpg` e `colar-dourado-patins-zirconia_rubi.jpg` têm 212.336 bytes e hash idêntico. A foto mostra um pingente de patins, coerente com o produto #4; foi mantida no destino apenas sob o nome `colar-dourado-patins-zirconia_rubi.jpg`. Ambos os arquivos originais foram preservados.

O mapa completo está em [`MAPA-FOTOS-PRODUTOS.csv`](./MAPA-FOTOS-PRODUTOS.csv) e o resumo em [`MAPA-FOTOS-PRODUTOS.md`](./MAPA-FOTOS-PRODUTOS.md). Foram mapeadas 133 cópias a 52 dos 53 produtos; o produto #5 (“Colar prata: Patins maciço”) não tem equivalente em `spinning_fotos` e requer obtenção da foto correspondente. A pasta do projeto contém 133 imagens (73.748.718 bytes); o working tree passou de 1.774.113 para 75.550.193 bytes, excluindo `.git/` e `node_modules/`.

**Estado atualizado da seção 3:** inventário e associação por nomes/títulos concluídos; há uma lacuna documentada para o produto #5. As 19 fotos de conjunto estão copiadas e associadas quando o design/material/cor corresponde ao título do produto. A seção 4 deve manter a URL atual do #5 até existir foto local correta.

## Dia 4 — URLs de imagens no catálogo local

- Criado `public/produtos.json` a partir do snapshot `gist_produtos/produtos-spinning_joias.json`; o arquivo original de origem não foi alterado.
- Atualizado `src/hooks/useProdutos.ts` para buscar `/produtos.json`, deixando o catálogo lido no próprio deploy.
- Convertidos os caminhos em destaque, galeria e variações para root-relative `/images/produtos/...`, usando o mapa foto→produto. As demais fotos locais associadas pelo nome/título foram incluídas nas galerias; nenhum campo de preço, descrição, categoria, título ou variação foi alterado.
- Resultado: 53 registros; 146 ocorrências de imagem, sendo 145 locais e 1 URL externa preservada no produto #5, pois não há foto local do colar prata com patins maciço. Há 133 caminhos locais únicos; todos resolvem para arquivos existentes e todos os 133 arquivos do destino aparecem no JSON.
- A foto Ruby descrita no texto do produto #13 não aparece como cor/URL no JSON de origem; nenhuma variante foi inventada.
- `public/images/produtos/`: 133 arquivos / 73.748.718 bytes. `public/produtos.json`: 30.775 bytes.
- Verificação de preservação: os campos não relacionados a imagens foram comparados com a origem; 0 registros tiveram alterações nesses metadados.

**Estado da seção 4:** concluída para os 52 produtos com fotos locais. A URL remota do produto #5 é exceção aprovada pelo cliente e permanece como está.

### Aprovação do cliente — imagem do produto #5

O cliente orientou manter a foto/URL atual do produto #5 (`Colar prata: Patins maciço`) como está. A referência externa foi preservada de propósito, embora ainda não exista arquivo correspondente em `spinning_fotos/`. Ela não bloqueia o aceite da seção 4.

**Estado atualizado da seção 4: concluída.** O catálogo carrega o JSON local; todas as imagens com equivalência local usam caminhos `/images/produtos/...`; a URL atual de #5 é a exceção aprovada.


## Dia 5 — remover o provider global do carrinho

- Removido `CarrinhoProvider` do bootstrap em `src/main.tsx`.
- Desacoplado `Header` do contexto: removidos o contador/ícone e o acesso à rota do carrinho.
- Removida a entrada “Ver carrinho” do menu mobile.
- Para manter as páginas ainda existentes operacionais durante as próximas sessões, o provider foi limitado às rotas `/produto/:id` e `/carrinho` em `src/routes/AppRoutes.tsx`. A página de produto ainda usa o fluxo de carrinho, e a página/rota de carrinho será retirada nas sessões 6 e 7.

**Estado da seção 5:** concluída. O bootstrap e os componentes de navegação não dependem mais de `CarrinhoProvider`/`useCarrinho`; o contexto restante está isolado nas páginas que ainda serão removidas ou simplificadas.

## Dia 6 — remover ações de compra da página de produto

- Removido o botão “Adicionar ao Carrinho”, seu controle de quantidade e o modal de seleção de variação de compra da página de detalhes.
- Excluídos os componentes sem uso `BtnAddCarrinho.tsx` e `ModalSelecionaCor.tsx`, além da regra de estilo exclusiva do CTA.
- Removida a dependência do provider da rota `/produto/:id`; a rota de detalhes segue mostrando preço, cores e fotos, com seleção de cor apenas para consultar a galeria.
- Os cards já exibiam apenas “Ver produto”; não havia CTA de compra neles. O provider continua restrito à rota `/carrinho` até sua retirada na seção 7.
- O teste unitário antigo de `ModalSelecionaCor` ainda referencia o componente removido; a adequação dos testes está prevista para a seção 10.

**Estado da seção 6:** concluída. A página de produto não oferece adição ao carrinho, quantidade ou modal de compra; as variações continuam consultáveis.

## Dia 7 — remover rota e implementação do carrinho

- A rota `/carrinho` agora informa “O catálogo não possui carrinho.” e redireciona para `/` com substituição do histórico, para que o botão Voltar não retorne ao endereço desativado.
- Removida a página do carrinho, o contexto, o hook de total, os componentes de formulário/tabela, as validações e os tipos exclusivos dessa funcionalidade. Também foram removidos estilos exclusivos do carrinho.
- Removido o acesso “Ver carrinho” que ainda existia na página de detalhes. Cabeçalho, menu mobile e ações de compra do produto já haviam sido ajustados nas seções 5 e 6.
- O conteúdo antigo do carrinho na FAQ e seus assets ficam para a seção 8; testes que ainda importam componentes removidos ficam para a seção 10.

**Estado da seção 7:** concluída. A rota antiga oferece redirecionamento de compatibilidade e a implementação funcional do carrinho foi retirada do app.

## Dia 8 — apresentação do catálogo e FAQ

- A FAQ já havia sido reescrita no código para explicar busca, navegação por categorias, consulta de fotos e variações, contato com a loja, pagamento/entrega e atendimento presencial no modelo de catálogo. O conteúdo não oferece carrinho nem promete finalização de pedido pelo site.
- Atualizada na página de detalhes a chamada para a FAQ: agora convida a consultar dúvidas sobre o produto ou sobre como falar com a loja, sem sugerir que a compra é realizada no site.
- A página de detalhes passa a exibir somente o preço registrado no catálogo. O preço anterior aparecia riscado, calculado automaticamente como 10% acima do preço atual, embora o JSON não registre desconto nem preço anterior; removida essa indicação para não sugerir um desconto não confirmado.
- Miniaturas da galeria e seletores de cor foram convertidos em botões com rótulos acessíveis e estado de seleção exposto; continuam servindo apenas para consultar fotos e variações.

**Estado da seção 8:** concluída. Preço, galeria, seleção de cores e chamada para a FAQ estão alinhados ao catálogo consultivo; a FAQ reescrita no código foi registrada neste diário.

## Dia 9 — documentação, metadados e assets sem uso

- Reescrito o README para descrever o site como catálogo, a fonte local `public/produtos.json`, as fotos versionadas e os comandos atuais de desenvolvimento e verificação. Removida a árvore antiga que listava arquivos de carrinho já excluídos.
- Atualizado o `<meta name="description">` da página para apresentar a consulta de catálogo e os canais de contato. Corrigidos o valor do meta de compatibilidade do navegador e o caminho do favicon.
- Removidos nove screenshots antigos de carrinho e checkout de `src/assets/`; a busca no repositório confirmou que já não eram referenciados pelo código ou pela documentação.

**Estado da seção 9:** concluída. README, descrição da página e referências visuais correspondem ao catálogo sem fluxo de pedido.

## Dia 10 — atualização da suíte de testes

- Excluídos os testes de componentes, contexto, quantidade e validações exclusivos do carrinho/checkout removido; ajustado o teste de constantes para cobrir apenas as opções atuais de paginação.
- Adicionada cobertura para o carregamento de `/produtos.json`, integridade das referências de imagens locais, preço e CTA informativo dos cards, galeria/cores/preço nos detalhes e ausência de ações de compra.
- Removida a função de preço “sem desconto” que inventava um acréscimo de 10%, junto dos testes correspondentes. Cards e página de detalhes agora mostram apenas o preço cadastrado.
- Ajustados os testes de navegação e scroll para isolar APIs de navegador que não existem no JSDOM.

**Verificação:** `npx --no-install jest --runInBand` — 13 suítes aprovadas, 32 testes aprovados.

**Estado da seção 10:** concluída para a limpeza e cobertura descritas acima. Lint, build e revisão técnica completa continuam previstos para a sessão 11.

## Dia 11 — revisão técnica local

- A home agora recebe os estados `loading` e `erro` reais do hook do catálogo. A página de detalhes mostra estado de carregamento, estado de falha e produto inexistente separadamente.
- Testes adicionados para esses estados e repetida a suíte completa: **13 suítes e 35 testes aprovados**.
- `npm run lint`: aprovado.
- `npm run build`: aprovado. O diretório de deploy gerado contém 141 arquivos, incluindo as 133 fotos do catálogo, com 74.627.765 bytes no total.
- O build ainda exibe avisos informativos sobre a base `caniuse-lite` desatualizada e o plugin `@tailwindcss/line-clamp` que já vem incluído no Tailwind 3.3+. Não impediram lint, testes ou build.

**Estado da seção 11:** concluída localmente. QA de preview Vercel e aceite continuam pendentes conforme as sessões seguintes do plano.

## Solicitações adicionais da cliente — 06/11/2026

- **Navegação:** ao retornar por “Página inicial”, limpar o filtro de categoria para mostrar o catálogo completo. Aplicar o comportamento também ao link de início do rodapé.
- **Quantidade por página:** limitar as opções do seletor ao total de produtos após os filtros; se não houver resultados, ocultar o seletor.
- **Tema padrão:** iniciar em tema escuro quando não houver uma preferência previamente salva. Manter a troca manual de tema e persistir a escolha da pessoa visitante.
- **Créditos da versão:** atualizar o rodapé para “v. 3.0 by Vitória de Camargo” e vincular o nome ao site `https://vitoria-de-camargo.vercel.app/`.
- **Checkpoint da sprint:** após o Dia 11, entregar a versão dev ao cliente para avaliação e aguardar aprovação antes de seguir para as sessões restantes. O plano passa a ter 19 sessões mais até quatro de reserva.

**Implementação e verificação:** os links de início limpam o filtro; o seletor de quantidade respeita o número filtrado e some sem resultados; o tema abre escuro por padrão e só grava uma preferência quando a pessoa o alterna; o rodapé identifica a versão 3.0 e aponta para o site indicado. O checkpoint foi inserido como sessão 12 e os passos posteriores foram reenumerados. Foram adicionados testes para navegação, opções de paginação, tema e créditos do rodapé. Verificações: 17 suítes/42 testes aprovados, lint aprovado e build aprovado.

## Sessão 12 — aprovação da versão dev

- A cliente confirmou a aprovação da versão dev publicada na branch `dev` em 06/11/2026.
- Gate de sprint aprovado; liberado o início das sessões de QA 13–15 conforme o plano.

## Incidente de deploy Vercel — Node.js

- Em 06/11/2026, o deploy Preview falhou porque o projeto tentou usar Node.js `20.x`, runtime descontinuado pela Vercel; a mensagem de falha pede `26.x`.
- `package.json` e `package-lock.json` declaram `engines.node: 26.x`; `.nvmrc` também seleciona Node 26 para ambientes locais que a respeitam. A Vercel permite que `engines.node` defina a versão acima da configuração do painel.
- A cliente confirmou que a nova execução do deploy Preview foi bem-sucedida após o envio de `d723937` à branch remota `dev`.
- A validação local foi executada em Node.js `22.14.0`; não comprova o build em Node 26 por si só.

## Sessões 13–17 — QA do Preview e correções

- O link compartilhável liberou o alias de `dev`. Home e JSON carregam; o JSON contém 53 produtos. O primeiro QA encontrou `404 NOT_FOUND` em acessos diretos a `/produto/1` e `/carrinho`.
- Corrigido o fallback SPA em `vercel.json`, com rewrite para `/index.html` após a resolução de arquivos existentes. No Preview atualizado, `/produto/1`, `/produto/9`, `/faq` e `/about` carregam a aplicação; `/carrinho` monta a rota antiga, redireciona para `/` e informa que o catálogo não possui carrinho. A regra está coberta por `vercelConfig.test.ts`.
- Desktop e mobile verificados. Em viewport mobile de 390 px, home e detalhe de produto não apresentaram overflow horizontal; menu e navegação funcionaram. Em desktop, a home também não apresentou overflow. O console não mostrou erros.
- Busca com resultado (36 produtos) e sem resultado (0) validada; o seletor some sem resultados e limita opções aos totais filtrados (15, 10 e 7 produtos). Ordenação por preço, paginação, URL direta com categoria e retorno à home limpando o filtro passaram.
- Detalhe do produto #9 exibiu a galeria de 17 fotos e 9 cores; seleção de foto e cor funcionou. As 133 referências locais de imagem responderam HTTP 200. A foto externa aprovada do produto #5 carregou no Preview.
- FAQ orienta a falar diretamente com a loja; não foram encontrados controles de adicionar/finalizar compra nem links de carrinho na página de produto. O teste de integração de `/carrinho` com dados legados em `localStorage` confirmou o redirecionamento para a home sem ler nem remover esses dados.
- Tema abriu escuro; alternar para claro e recarregar preservou a escolha. O retorno para escuro também persistiu após recarga.
- A varredura encontrou textos ambíguos de compra em dois produtos e na página “Sobre”. Eles foram alinhados ao catálogo e à consulta direta com a loja; os novos textos foram confirmados no Preview.
- Estado local: 20 suítes e 46 testes aprovados; lint e build aprovados. O build local roda em Node.js `22.14.0`; a cliente confirmou que o deploy Vercel com a declaração `26.x` foi bem-sucedido. Branch remota `dev` contém as correções de fallback e textos.
- **Estado:** sessões 13–17 concluídas. A cliente aprovou o Preview na sessão 18; a sessão 19 foi publicada em produção e iniciou a janela de observação de cinco dias úteis.

## Sessão 18 — aceite final do Preview

- Em 06/11/2026, a cliente aprovou a versão final do Preview após a revisão de QA das sessões 13–17.
- Autorizada a publicação em produção, condicionada à promoção do commit aprovado de `dev` para a branch de produção `main`.

## Sessão 19 — publicação em produção

- O commit `44918a6` foi promovido por fast-forward de `dev` para `main` e enviado ao GitHub; o deploy Production da Vercel ficou `Ready`.
- Deployment: `https://spinning-joias-8dk7cpjzf-vpaesis-projects.vercel.app`; alias de produção: `https://spinning-joias.vercel.app/`.
- O log de produção confirma que `engines.node: 26.x` prevaleceu sobre a preferência `20.x` do painel e que o build terminou com sucesso.
- Smoke test no domínio público: home e `/produto/1`, `/produto/9`, `/carrinho`, `/faq`, `/about` e `/produtos.json` responderam. O detalhe de produto e a FAQ renderizaram; `/carrinho` redirecionou à home. O JSON contém 53 produtos.
- As 133 imagens locais referenciadas responderam HTTP 200; a imagem externa aprovada do produto #5 respondeu HTTP 200 (`image/png`). A home de produção carregou 18 imagens visíveis, sem imagem quebrada, overflow horizontal ou erro de console.
- Verificações do release: 20 suítes/46 testes aprovados; lint e build local aprovados. O build de produção da Vercel também concluiu em Node 26.x.
- **Estado:** publicação concluída; inicia-se a observação de cinco dias úteis prevista na seção 9 do plano. O alias de Preview continua disponível para futuras correções.
