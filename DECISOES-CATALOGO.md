# Registro de decisões — Catálogo navegável

**Data do checkpoint:** 30/10/2026  
**Branch:** `codex/catalogo-navegavel`  
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
