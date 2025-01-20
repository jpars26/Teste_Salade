describe('Entrando no site', () => {
    beforeEach(() => {
      cy.visit('https://www.saladesaudavel.com.br/');
    });

    context('Teste de Responsividade do Site', () => {
          const viewports = ['macbook-16', 'macbook-15', 'macbook-13', 'macbook-11', 'ipad-2', 'ipad-mini', 'iphone-xr', 'iphone-x', 'iphone-6', 'iphone-se2', 'iphone-8', 'iphone-7', 'iphone-6', 'iphone-5', 'iphone-4', 'iphone-3', 'samsung-s10', 'samsung-note9'];
          viewports.forEach(viewport => {
              it(`Testando responsividade em ${viewport}`, () => {
                  cy.viewport(viewport);
                  cy.visit('https://www.saladesaudavel.com.br');
                  cy.get('.elementor-element-dbaf086 > .elementor-widget-container > .elementor-button-wrapper > .elementor-button').should('be.visible');
              });
          });

         
   });
});

