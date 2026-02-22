describe('Signup', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('shows signup form and can navigate to login', () => {
    cy.contains('Sign up').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains('Sign in').click();
    cy.url().should('include', '/login');
    cy.contains('Sign in').should('be.visible');
  });
});
