
// Link Test Manual: https://docs.google.com/spreadsheets/d/1hv9EVgqjvJZpw78LzSiUQ4woHqB4D8PC4BAxHn-F178/edit?gid=0#gid=0

describe('OrangeHRM Login Test', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.url().should('include', '/auth/login');
  }); 

  it('TC001 - login berhasil dengan valid data', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('Admin');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin123');
    cy.xpath('//button[@type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('h6').should('contain.text', 'Dashboard');
  });

  it('TC002 - login gagal dengan password yang tidak valid', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('Admin'); 
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin456'); 
    cy.xpath('//button[@type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('be.visible').and('contain.text', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC003 - Login gagal dengan tanpa username & password', () => {
     cy.xpath('//button[@type="submit"]').click();

    cy.get('.oxd-input-group__message').should('have.length', 2).each(($el) => {
      cy.wrap($el).should('contain.text', 'Required');
    });
  }); 

  it('TC004 - Cek case sensitif username & password dengan huruf kapital', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('ADMIN');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('ADMIN123')
    cy.xpath('//button[@type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('be.visible').and('contain.text', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC005 - Login gagal dengan username salah', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('Admuser');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin123');
    cy.xpath('//button[@type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('be.visible').and('contain.text', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC006 - Cek case sensitif password dengan huruf kapital', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('Admin');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('ADMIN123');
    cy.xpath('//button[@type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('be.visible').and('contain.text', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
    
  });

  it('TC007 - Cek case sensitif username dengan huruf kapital', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('ADMIN');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin123');
    cy.xpath('//button[@type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('h6').should('contain.text', 'Dashboard');
  });

  it('TC008 - Login berhasil dengan <spasi> diakhir username', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('Admin ');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin123');
    cy.xpath('//button[@type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('h6').should('contain.text', 'Dashboard');
  });

  it('TC009 - Login berhasil dengan <spasi> diakhir password', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('Admin');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin123 ');
    cy.xpath('//button[@type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('be.visible').and('contain.text', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC010 - Login gagal tanpa input password', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('Admin');
    cy.xpath('//button[@type="submit"]').click();

    cy.xpath('//input[@type="password"]').parents('.oxd-input-group').find('.oxd-input-group__message').should('be.visible').and('contain.text', 'Required');
    cy.url().should('include', '/auth/login');
  });

  it('TC011 - Login gagal tanpa input username', () => {
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin123');
    cy.xpath('//button[@type="submit"]').click();

    cy.xpath('//input[@name="username"]').parents('.oxd-input-group').find('.oxd-input-group__message').should('be.visible').and('contain.text', 'Required');
    cy.url().should('include', '/auth/login');
  });

  it('TC012 - login berhasil dengan username & password huruf kecil', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('admin');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin123');
    cy.xpath('//button[@type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('h6').should('contain.text', 'Dashboard');
  });

  it('TC013 - login gagal dengah username menggunakan simbol', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('Admin#');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin123 ');
    cy.xpath('//button[@type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('be.visible').and('contain.text', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC014 - login gagal dengah password menggunakan simbol', () => {
    cy.xpath('//input[@name="username"]').clear().should('be.visible').type('Admin');
    cy.xpath('//input[@type="password"]').clear().should('be.visible').type('admin#123');
    cy.xpath('//button[@type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('be.visible').and('contain.text', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

});