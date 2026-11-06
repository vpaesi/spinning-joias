# Spec técnico e plano de execução — Catálogo navegável

**Produto:** Spinning Joias  
**Repositório analisado:** `vpaesi/spinning-joias`  
**Data:** 30/10/2026  
**Público:** cliente, desenvolvimento e QA  
**Capacidade considerada:** média de 1 hora de trabalho por dia para o time (dev + QA).

## 1. Resumo para o cliente

O site passará a funcionar como catálogo digital: visitantes poderão encontrar produtos, consultar fotos, descrição, variações e preços, sem carrinho, formulário de compra ou finalização de pedido pelo site. A navegação atual (busca, categorias, ordenação, paginação, detalhes e FAQ) será mantida e ajustada para essa finalidade. As fotos de `C:\Users\vitoria.camargo\pessoal\spinning\spinning_fotos` serão copiadas para `C:\Users\vitoria.camargo\pessoal\spinning\spinning-joias\public\images\produtos\` e os endereços de imagem no catálogo serão atualizados para apontar para os arquivos do próprio site. O JSON de produtos será mantido localmente no repositório, conforme decisão aprovada no checkpoint do dia 1. Os canais de contato da loja continuam disponíveis para dúvidas e compra assistida.

O plano estima **18 a 22 dias úteis**, em sessões de aproximadamente uma hora, incluindo validação do cliente, QA, publicação gradual e observação após a publicação. A duração pode mudar conforme a aprovação de textos e a disponibilidade de dados e ambiente da Vercel.

## 2. Objetivo e resultado esperado

Simplificar a experiência para consulta de catálogo, removendo todos os mecanismos de composição e envio de pedidos. Ao final, a pessoa deve conseguir localizar um produto e consultar suas informações em celular ou desktop, sem encontrar chamadas para adicionar ao carrinho ou finalizar compra.

## 3. Situação atual observada no código

- Aplicação React 18, TypeScript e Vite, com rotas em `src/routes/AppRoutes.tsx`.
- Metadados de produtos são carregados atualmente no hook `src/hooks/useProdutos.ts` de um GitHub Gist público; a implementação será migrada para JSON local conforme decisão aprovada. O catálogo contém título, descrição, categoria, preço, URLs de fotos, informações extras e cores. A pasta de fotos de origem está fora do clone, em `C:\Users\vitoria.camargo\pessoal\spinning\spinning_fotos`.
- A home já oferece busca, filtros por categoria, ordenação por preço/nome, paginação, carrossel e cards.
- `src/pages/ProdutoDetalhes.tsx` já exibe preço, descrição, fotos e variações, mas também oferece seleção para compra e acesso ao carrinho.
- O fluxo de compra está distribuído entre `CarrinhoProvider` em `src/main.tsx`, `src/context/CarrinhoContext.tsx`, `Header`, menu mobile, `BtnAddCarrinho`, a rota `/carrinho`, a página de carrinho e componentes de formulário/WhatsApp.
- A FAQ e o README ainda descrevem o modelo de ecommerce e precisarão ser atualizados.
- Existem testes automatizados focados no carrinho. Dev deverá revisar e ajustar/remover os testes que deixarem de representar funcionalidades existentes; QA também fará verificação manual.

## 4. Escopo

### Incluído

1. Remover carrinho, quantidade, seleção de variação voltada à compra, formulário de entrega/pagamento e geração de pedido para WhatsApp.
2. Retirar ícone/contador de carrinho do cabeçalho, entrada de carrinho do menu mobile, controles de carrinho na página de produto e rota `/carrinho`.
3. Manter o acesso aos detalhes por card; trocar chamadas de compra por ação informativa (ex.: “Ver detalhes”).
4. Manter busca, filtros, ordenação, paginação e navegação por URL, corrigindo regressões encontradas.
5. Manter galeria, descrição, preço e informações extras nos detalhes. Exibir cores/variações como informação consultável, sem ação de compra.
6. Preservar contato da loja (WhatsApp, Instagram e email) como canal geral. O botão de contato não deve montar pedido nem transmitir dados pessoais ou itens selecionados.
7. Atualizar FAQ, textos de navegação, README, title/description da página e referências visuais/documentais que induzam a uma compra online.
8. Tratar links antigos para `/carrinho` com redirecionamento à home/catálogo, com mensagem breve de que o catálogo não possui carrinho.
9. Revisar responsividade, acessibilidade básica dos controles e estados de carregamento/erro do catálogo.
10. Copiar as fotos utilizadas pelo catálogo de `C:\Users\vitoria.camargo\pessoal\spinning\spinning_fotos` para `C:\Users\vitoria.camargo\pessoal\spinning\spinning-joias\public\images\produtos\` e atualizar no JSON local as URLs para caminhos root-relative do site (ex.: `/images/produtos/nome-da-foto.webp`); preservar nomes/associações de produto e variação. Manter a pasta de origem até confirmar que as imagens copiadas estão presentes no destino, referenciadas corretamente e validadas no Preview. Exceção aprovada pelo cliente em 30/10/2026: manter a URL externa atual da foto do produto #5 (Colar prata: Patins maciço), pois não há arquivo correspondente em `spinning_fotos/`.
11. Fazer inventário do conteúdo e do tamanho do repositório antes/depois, removendo apenas duplicatas e assets obsoletos identificados e não referenciados, para confirmar a redução líquida informada sem apagar imagens em uso.

### Fora do escopo desta entrega

- Pagamento, checkout, reserva, controle de estoque ou disponibilidade em tempo real.
- Painel administrativo ou ferramenta de edição do JSON de produtos local.
- Reprecificação, produção de novas fotografias e alterações de identidade visual ampla.
- Orçamentos automáticos ou envio de mensagem com dados de produto para WhatsApp. Se a loja desejar uma consulta de produto pré-preenchida, isso deverá ser aprovado e especificado separadamente.

## 5. Requisitos funcionais

| ID | Requisito | Critério de aceite |
|---|---|---|
| RF-01 | Consultar catálogo | Home lista produtos existentes e permite abrir seus detalhes. |
| RF-02 | Encontrar produtos | Busca, categorias, ordenação e paginação continuam operacionais em desktop e mobile. |
| RF-03 | Consultar detalhes | Cada URL `/produto/:id` apresenta título, preço formatado, descrição, fotos e informações extras quando existentes. |
| RF-04 | Consultar variações | Cores/variações e respectivas imagens, quando disponíveis, são apresentadas como informação; nenhuma seleção adiciona item ou configura pedido. |
| RF-05 | Remover compra online | Nenhuma página, botão, link ou mensagem de produção oferece carrinho, adicionar, quantidade, checkout, pagamento ou finalização de pedido. |
| RF-06 | Contatar a loja | Links institucionais de WhatsApp/Instagram/email continuam válidos e não enviam informações pessoais nem um pedido gerado pelo site. |
| RF-07 | Acessar rota antiga | `/carrinho` redireciona para o catálogo sem erro de página. |
| RF-08 | Atualizar ajuda | FAQ explica como navegar/consultar produtos e como falar com a loja; não ensina fluxo removido. |
| RF-09 | Acessibilidade e estados | Imagens têm texto alternativo útil; controles de galeria e navegação têm rótulos acessíveis; carregamento, falha de fonte de dados e produto inexistente têm estado compreensível. |

### Requisitos não funcionais

- Preservar o padrão visual e os tempos de carregamento atuais, evitando bibliotecas novas sem necessidade.
- Layout utilizável em larguras de celular e desktop, sem rolagem horizontal acidental.
- Evitar erros de console e links quebrados nos fluxos principais.
- Continuar compatível com deploy estático atual na Vercel e com acesso direto/refresh nas rotas de produto.

## 6. Decisões a confirmar no início

O plano assume: preços continuam visíveis; canais sociais permanecem; não haverá botão “consultar este produto” com mensagem pré-preenchida; o JSON de produtos fica no repositório; os arquivos de `C:\Users\vitoria.camargo\pessoal\spinning\spinning_fotos` serão copiados para `C:\Users\vitoria.camargo\pessoal\spinning\spinning-joias\public\images\produtos\`; `/carrinho` redireciona para a home. As URLs das fotos no JSON local serão root-relative ao domínio do site (por exemplo, `/images/produtos/foto.webp`), e a manutenção das fotos passará a requerer commit e deploy. O cliente deve validar essas premissas no primeiro checkpoint. A equipe também deve confirmar o projeto/domínio de preview na Vercel e quem aprova a publicação.

## 7. Plano por sessões de uma hora

Estimativa de **18 sessões de execução** mais **até 4 sessões de folga** para correções, espera de aprovação ou problemas de ambiente. As sessões representam uma hora total disponível do time por dia; dev e QA podem alternar a responsabilidade.

|      Dia/sessão | Responsável principal | Trabalho e evidência de conclusão                                                                                                                                                                                  |
| --------------: | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|               1 | Dev + cliente         | Confirmar premissas, escopo, canal de contato e aprovação; registrar decisão.                                                                                                                                      |
|               2 | Dev                   | Mapear referências de ecommerce no app, inventariar `C:\Users\vitoria.camargo\pessoal\spinning\spinning_fotos` e as URLs/tamanhos de imagem, e definir compatibilidade de rota.                                    |
|               3 | Dev                   | Copiar fotos necessárias para `C:\Users\vitoria.camargo\pessoal\spinning\spinning-joias\public\images\produtos\`, remover somente duplicatas/arquivos sem uso acordados e registrar tamanho inicial/final do repo. |
|               4 | Dev                   | Atualizar URLs de imagens no JSON local para caminhos root-relative do site; revisar nomes, maiúsculas/minúsculas, acentos e variações; validar amostra de URLs.                                                   |
|               5 | Dev                   | Remover `CarrinhoProvider` do bootstrap e dependências do contexto nos componentes de navegação.                                                                                                                   |
|               6 | Dev                   | Remover CTA de adicionar, quantidade e modal de variações para compra dos cards/detalhes.                                                                                                                          |
|               7 | Dev                   | Remover rota/página de carrinho e redirecionar `/carrinho`; ajustar cabeçalho, menu mobile e página de detalhes.                                                                                                   |
|               8 | Dev                   | Consolidar apresentação de preço, cores/variações e galeria; reescrever FAQ para o modelo catálogo.                                                                                                                |
|               9 | Dev                   | Atualizar README, metadados e imagens/referências que instruem checkout.                                                                                                                                           |
|              10 | Dev                   | Limpar ou adequar testes obsoletos do carrinho e criar cobertura para navegação, carregamento local das fotos e ausência de compra.                                                                                |
|              11 | Dev                   | Revisão técnica do diff, tipos, lint/build, tamanho do deploy e inspeção das rotas/estados de erro.                                                                                                                |
|              12 | QA                    | Publicar/usar preview Vercel; smoke test em desktop e celular; registrar defeitos com passos e evidências.                                                                                                         |
|              13 | QA                    | Testar busca, categoria, URL com parâmetros, ordenação, paginação, galeria, cores, imagem de cada item e rota inválida.                                                                                            |
|              14 | QA                    | Varredura de ausência de checkout: navegação, textos, botões, FAQ, links antigos, persistência antiga e imagens quebradas.                                                                                         |
|              15 | Dev                   | Corrigir defeitos prioritários encontrados no preview.                                                                                                                                                             |
|              16 | QA                    | Regressão direcionada das correções e revisão de acessibilidade/visual em celular e desktop.                                                                                                                       |
|              17 | Cliente + QA          | Aceite do preview usando checklist da seção 8; registrar aprovado ou pendências.                                                                                                                                   |
|              18 | Dev + QA              | Publicar em produção após aceite, validar domínio, imagens e rotas, manter registro de versão e plano de reversão.                                                                                                 |
| 19–22 (reserva) | Dev/QA                | Até quatro sessões para correções adicionais, espera de aprovação, Vercel ou regressões.                                                                                                                           |

**Duração prevista:** 18–22 dias úteis (cerca de 4 semanas, considerando dias úteis). A incorporação das fotos e validação das referências está incluída nos dias 2–4, sem adicionar prazo-base, assumindo que as pastas de origem/destino e o snapshot local do catálogo estejam acessíveis e que o inventário confirme a redução líquida informada. Se a organização das fotos exigir correção manual extensa, usar as sessões de reserva; não comprimir o período de QA.

## 8. Plano de QA e aceite

Executar no preview da Vercel antes de produção, em pelo menos um navegador desktop e um celular real ou emulação responsiva.

### Roteiros

1. **Catálogo:** abrir home, ver cards, entrar nos detalhes e retornar; testar busca com resultado e sem resultado.
2. **Navegação:** escolher categoria, ordenar por nome e preço, mudar paginação e abrir URL com `categoria`/`busca`.
3. **Detalhes:** abrir produto com várias fotos e cores, trocar foto, verificar preço/texto; repetir produto sem variações e ID inexistente.
4. **Fotos locais:** verificar que todas as URLs de imagem com correspondência local resolvem para arquivos do deploy, que cada foto de produto/variação corresponde ao item certo e que não há dependência de URL externa para carregar os metadados. Exceção aprovada pelo cliente: manter como está a URL externa da foto do produto #5 (`Colar prata: Patins maciço`). Testar acesso direto às imagens locais e a acessibilidade dessa URL no Preview e após deploy.
5. **Remoção do ecommerce:** confirmar ausência de sacola/contador, “Adicionar ao carrinho”, quantidade, `/carrinho`, formulário de entrega/pagamento e “Finalizar compra”. Testar também URL antiga e dados `carrinho` já existentes no localStorage.
6. **Contato:** abrir links de contato e confirmar que continuam apontando aos perfis oficiais, sem disparo automático de pedido ou dados pessoais.
7. **FAQ e responsividade:** validar conteúdo atualizado, navegação por teclado, foco perceptível, nomes acessíveis e layout em larguras mobile/desktop.
8. **Produção:** após publicar, repetir smoke test em domínio real e testar acesso direto e refresh de `/produto/:id` e `/carrinho`.

### Critérios de aceite do cliente

- A consulta de preço, fotos, descrição e variações é simples em celular e desktop.
- Não há caminho de carrinho/checkout nem linguagem que prometa compra pelo site.
- A navegação de catálogo e os contatos oficiais funcionam.
- Fotos de produtos e variações com arquivo local carregam no domínio da Vercel e estão associadas aos registros corretos; a foto do produto #5 mantém a URL externa atual por aprovação do cliente.
- FAQ corresponde ao novo processo.
- QA não tem defeito bloqueador ou alto aberto; pendências menores têm responsável e acordo explícito.

## 9. Publicação, observação e reversão

- Usar deploy Preview da Vercel ligado à branch/PR e validar ali antes da produção.
- Servir imagens por URLs do próprio deploy Vercel (arquivos públicos versionados), exceto a foto do produto #5, cuja URL externa atual foi mantida por aprovação do cliente; manter o JSON local no repositório, com referências relativas às demais imagens.
- Produção somente após aceite do cliente; registrar URL, commit e horário da publicação.
- Observar erros reportados e links essenciais por **5 dias úteis**, reservando uma sessão curta por dia dentro das quatro sessões de folga (a equipe pode reagrupar conforme capacidade).
- Se houver regressão grave de navegação ou catálogo, reverter ao último deploy estável na Vercel e corrigir no preview antes de republicar.
- A mudança remove o uso de `localStorage` do carrinho. Dados antigos podem permanecer no navegador, mas não serão apresentados nem usados. Se o time preferir removê-los, fazê-lo de modo isolado e documentado, sem apagar outras chaves.

## 10. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| FAQ e imagens antigas continuam prometendo checkout | Busca textual e revisão visual das páginas e assets durante desenvolvimento e QA. |
| Testes existentes falham por testar funcionalidades removidas | Atualizar a suíte na mesma mudança; executar testes, lint e build no checkpoint técnico. |
| JSON local ausente ou com campos incompletos | Testar estados de falha e produtos com campos opcionais; manter instrução de contato em caso de indisponibilidade. O catálogo e as imagens locais serão servidos pelo próprio deploy. |
| URLs relativas de imagens resolvem incorretamente ou há diferença de maiúsculas/minúsculas no deploy | Padronizar caminhos sem espaços/acentos e validar links de todas as imagens no Preview Vercel. |
| Imagens adicionadas aumentam o repositório ou removem arquivos ainda em uso | Comparar inventário e tamanho antes/depois; otimizar fotos e apagar somente duplicatas/arquivos comprovadamente sem referência, preservando histórico e cópia de origem. |
| Cliente espera que o botão de contato leve dados do produto | Não incluído na premissa atual; decidir no checkpoint inicial antes de desenvolver. |
| Link direto ou refresh de rota quebra na Vercel | Validar preview e configuração de fallback de SPA antes da publicação. |
| Conteúdo de preços desatualizado | Confirmar que o JSON versionado no repositório é a fonte oficial e atribuir responsável pela manutenção. |

## 11. Definição de concluído

Implementação no branch de trabalho revisada; fotos do catálogo copiadas e referências validadas; comparação de tamanho do repositório registrada; testes automatizados, lint e build aprovados; QA em preview concluído; aceite do cliente registrado; publicação validada; plano de reversão conhecido; FAQ e documentação atualizados; janela de observação de cinco dias úteis iniciada.





