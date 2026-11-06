# Mapa de fotos para produtos

**Fonte dos registros:** `C:\Users\vitoria.camargo\pessoal\spinning\gist_produtos\produtos-spinning_joias.json`  
**Origem das fotos:** `C:\Users\vitoria.camargo\pessoal\spinning\spinning_fotos\`  
**Destino:** `public/images/produtos/`  
**Critério:** associação pelo nome do arquivo com o título do produto, usando tipo da peça, material, design e cor. O CSV contém cada foto original, os IDs/títulos relacionados, dimensão e bytes.

## Resultado

- 53 produtos no JSON.
- 134 arquivos na pasta de origem; 133 cópias no destino.
- 133 arquivos mantidos têm associação a pelo menos um produto do catálogo; 52 dos 53 registros têm uma foto local associada.
- Uma cópia foi excluída por duplicidade exata (SHA-256): `colar-dourado-patinadora-zirconia_rubi.jpg` é idêntica a `colar-dourado-patins-zirconia_rubi.jpg`. A imagem mostra um pingente de patins e foi mantida sob o nome coerente com o produto #4. Os dois originais continuam na pasta de origem.
- As 19 fotos `conjunto-*` foram incluídas no destino. O nome do arquivo e os atributos de material/design/cor correspondem a produtos do catálogo (por exemplo, as fotos de conjunto de colares de resina correspondem aos produtos de colar colorido). A imagem pode mostrar peças combinadas; essa observação aparece no CSV e deve ser levada em conta ao escolher as fotos da galeria.
- Há **uma lacuna de origem**: o produto #5, “Colar prata: Patins maciço”, não tem foto local com tipo/material/design correspondentes. A URL de destaque atual termina em `colar-prata-patins-macico.png`, mas não há arquivo equivalente em `spinning_fotos`. Não foi reaproveitada foto de brinco ou de outro acabamento como substituta. Por orientação do cliente, a URL externa atual desse produto foi mantida intencionalmente; essa exceção não bloqueia a seção 4.

## Medições finais desta etapa

- Destino: **133 arquivos**, **73.748.718 bytes (70,3 MiB)**.
- Working tree antes da etapa 3: **1.774.113 bytes**.
- Working tree após mapa/cópia: **75.550.193 bytes** (sem `.git/` e `node_modules/`).
- A pasta de origem continua intacta, com 134 arquivos.
- SHA-256 foi usado para verificar as cópias; a única duplicata exata foi identificada e só sua cópia com nome incorreto foi retirada.

## Arquivo detalhado

Consulte [`MAPA-FOTOS-PRODUTOS.csv`](./MAPA-FOTOS-PRODUTOS.csv) para o vínculo foto → ID/título do produto, dimensões, bytes, estado da cópia e observações.

**Estado:** inventário e associação por nome/título concluídos. A única ausência de foto local é o produto #5; a URL externa permanece por orientação do cliente e foi registrada como exceção aprovada na etapa 4.

## Execução da seção 4 — catálogo local e referências de imagem

A seção 4 está implementada. `public/produtos.json` foi criado a partir do snapshot local de origem; o hook `src/hooks/useProdutos.ts` agora carrega `/produtos.json`. As URLs locais de destaque, galeria e variações usam `/images/produtos/...`, selecionadas pelo mapa de nomes de arquivo e títulos do produto.

- **53 registros**; **146 referências de imagem**, com **145 locais** e **1 URL remota** preservada.
- **133 caminhos locais únicos**; todos os arquivos existem e todos os 133 arquivos publicados estão referenciados.
- Nenhum metadado fora dos campos de imagem foi alterado.
- A URL remota restante é o destaque de #5, `Colar prata: Patins maciço`; não existe foto correspondente em `spinning_fotos`.
- Os campos de variação foram mapeados pelas cores do produto. A menção a Ruby na descrição do produto #13 não foi convertida em uma variação inexistente no JSON.

`public/produtos.json` tem 30.775 bytes; `public/images/produtos/` tem 133 arquivos e 73.748.718 bytes. O snapshot de origem permanece inalterado.

