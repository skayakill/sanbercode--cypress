
// Link Test Manual: https://docs.google.com/spreadsheets/d/1hv9EVgqjvJZpw78LzSiUQ4woHqB4D8PC4BAxHn-F178/edit?gid=0#gid=0

describe('OrangeHRM Login Test', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.url().should('include', '/auth/login');
  }); 

  it('TC_LOGIN_001 - login berhasil dengan valid data', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('Admin');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin123');
    cy.xpath('//button[@type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('h6').should('contain.text', 'Dashboard');
  });

  it('TC_LOGIN_002 - login gagal dengan password yang tidak valid', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('Admin'); 
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin456'); 
    cy.xpath('//button[@type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('be.visible').and('contain.text', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC_LOGIN_003 - Login gagal dengan tanpa username & password', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group__message').should('have.length', 2).each(($el) => {
      cy.wrap($el).should('contain.text', 'Required');
    });
  }); 

  it('TC_LOGIN_004 - Cek case sensitif username & password dengan huruf kapital', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('ADMIN');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('ADMIN123')
    cy.xpath('//button[@type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('be.visible').and('contain.text', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC_LOGIN_005 - Login gagal dengan username salah', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('admuser');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin123');
    cy.xpath('//button[@type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('be.visible').and('contain.text', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });
});