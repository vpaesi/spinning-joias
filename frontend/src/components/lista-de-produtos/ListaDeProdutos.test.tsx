import { render, screen } from '@testing-library/react';
import ListaDeProdutos from './ListaDeProdutos';

describe('ListaDeProdutos', () => {
    test('deve exibir lista de produtos', () => {
        
    });
    
    test('deve exibir mensagem quando a lista de produtos está vazia', () => {
        render(<ListaDeProdutos listaDeProdutos={[]} />);
        expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
    });
});


