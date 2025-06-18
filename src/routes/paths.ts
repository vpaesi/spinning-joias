export const ROUTES = {
  CATEGORIA: (nome: string) => `/produtos/categoria/${nome}`
} as const;

export const CATEGORIAS_LINKS = {
  ANEIS: { nome: 'Anéis', link: ROUTES.CATEGORIA('aneis') },
  BERLOQUES: { nome: 'Berloques', link: ROUTES.CATEGORIA('berloques') },
  BRINCOS: { nome: 'Brincos', link: ROUTES.CATEGORIA('brincos') },
  COLARES: { nome: 'Colares', link: ROUTES.CATEGORIA('colares') },
  DIVERSOS: { nome: 'Diversos', link: ROUTES.CATEGORIA('diversos') },
} as const;

export type CategoriaKey = keyof typeof CATEGORIAS_LINKS;
