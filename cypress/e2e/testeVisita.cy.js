describe('Entrando no site', () => {
  beforeEach(() => {
    cy.visit('https://www.saladesaudavel.com.br/');
  });

  context('Verificando componentes na tela', () => {
    describe('Verificar se todos os componentes estão presentes no Menu Principal', () => {
      it('Verifica se o elemento esperado está visível', () => {
        cy.viewport(1280, 720); // Define a largura para 1280px e altura para 720px

        // Aguarda o carregamento do Elementor (opcional, se necessário)
        cy.location('pathname').should('equals', '/');
        
        // Verificar se os elementos principais estão presentes
        cy.get('.elementor-element-42fdb7b').should('exist');
        cy.get('.elementor-element-c553237').should('exist');
        cy.get('.elementor-widget-container > a')
          .find('.elementor-animation-shrink')
          .should('exist')
          .and('be.visible');
        
        // Verificar o botão de cardápio
        cy.get('.elementor-element-dbaf086 > .elementor-widget-container > .elementor-button-wrapper > .elementor-button').should('exist');
        
        // Verificar os botões do menu principal
        cy.get('.elementor-element-16f3cd7').should('exist');
        cy.get('.elementor-element-f5fb491 > .elementor-widget-container > .elementor-heading-title > a').should('exist');
        cy.get('.elementor-element-ccec4ca > .elementor-widget-container > .elementor-heading-title > a').should('exist');
        cy.get('.elementor-element-6130680 > .elementor-widget-container > .elementor-heading-title > a').should('exist');
      });
    });

    describe('Teste de redirecionamento ao clicar no botão do Cardapio', () => {
      it('Verifica se o botão abre a página correta', () => {
        
        // Verificar se a URL da página inicial está correta antes de clicar
        cy.url().should('include', 'saladesaudavel.com.br');
        
        // Simula o clique no botão para abrir o redirecionamento
        cy.get('.elementor-element-dbaf086 > .elementor-widget-container > .elementor-button-wrapper > .elementor-button')
          .invoke('removeAttr', 'target')
          .click();
        
        // Aguarda o carregamento da nova página
        cy.origin('https://pedido.anota.ai', () => {
          cy.url().should('include', 'pedido.anota.ai'); // Verifica se a nova URL está correta

        });
        // Volta para a página inicial
        cy.visit('https://www.saladesaudavel.com.br/'); 
  
        // Verifica se voltou para a página inicial corretamente
        cy.url().should('include', 'saladesaudavel.com.br');
      });
    });

    describe('Teste de Carregamento e Links do Site', () => {
      it('Verifica tempo de carregamento', () => {
        cy.visit('https://www.saladesaudavel.com.br');
        cy.window().then((win) => {
            expect(win.performance.timing.domContentLoadedEventEnd - win.performance.timing.navigationStart).to.be.lessThan(3000);
        });
    });

      it('Verifica links quebrados', () => {
        cy.get('a').each(($el) => {
            cy.request($el.prop('href')).its('status').should('eq', 200);
        });
    });
    });
  });
});

