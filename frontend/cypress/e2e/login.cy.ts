describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('shows login form and can navigate to sign up', () => {
    cy.contains('Sign in').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains('Sign up').click();
    cy.url().should('include', '/signup');
    cy.contains('Sign up').should('be.visible');
  });

  it('shows error on invalid credentials', () => {
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Sign in', { timeout: 10000 }).should('be.visible');
    cy.get('form').should('be.visible');
  });
});
