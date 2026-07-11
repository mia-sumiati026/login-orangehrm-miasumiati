describe('OrangeHRM Login Automation', () => {

    let data

    before(() => {
        cy.fixture('loginData').then((loginData) => {
            data = loginData
        })
    })

    beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
        timeout: 60000
    })

    cy.get('input[name="username"]', {
        timeout: 30000
    }).should('be.visible')
})

    //====================================================
    // TC-001 LOGIN VALID
    //====================================================

    it('TC-LOG-001 Login dengan username dan password valid', () => {

        cy.get('input[name="username"]')
            .type(data.validUser.username)

        cy.get('input[name="password"]')
            .type(data.validUser.password)

        cy.get('button[type="submit"]')
            .click()

        cy.url().should('include', '/dashboard')

    })


    //====================================================
    // TC-002 USERNAME KOSONG
    //====================================================

    it('TC-LOG-002 Login dengan username kosong', () => {

        cy.get('input[name="password"]')
            .type(data.validUser.password)

        cy.get('button[type="submit"]')
            .click()

        cy.contains('Required')
            .should('be.visible')

    })


    //====================================================
    // TC-003 PASSWORD KOSONG
    //====================================================

    it('TC-LOG-003 Login dengan password kosong', () => {

        cy.get('input[name="username"]')
            .type(data.validUser.username)

        cy.get('button[type="submit"]')
            .click()

        cy.contains('Required')
            .should('be.visible')

    })


    //====================================================
    // TC-004 USERNAME & PASSWORD KOSONG
    //====================================================

    it('TC-LOG-004 Login dengan username dan password kosong', () => {

        cy.get('button[type="submit"]')
            .click()

        cy.get('span.oxd-input-field-error-message')
            .should('have.length', 2)

    })


    //====================================================
    // TC-005 PASSWORD SALAH
    //====================================================

    it('TC-LOG-005 Login dengan password salah', () => {

        cy.get('input[name="username"]')
            .type(data.invalidPassword.username)

        cy.get('input[name="password"]')
            .type(data.invalidPassword.password)

        cy.get('button[type="submit"]')
            .click()

        cy.contains('Invalid credentials')
            .should('be.visible')

    })


    //====================================================
    // TC-006 USERNAME SALAH
    //====================================================

    it('TC-LOG-006 Login dengan username salah', () => {

        cy.get('input[name="username"]')
            .type(data.invalidUsername.username)

        cy.get('input[name="password"]')
            .type(data.invalidUsername.password)

        cy.get('button[type="submit"]')
            .click()

        cy.contains('Invalid credentials')
            .should('be.visible')

    })


    //====================================================
    // TC-007 USERNAME & PASSWORD SALAH
    //====================================================

    it('TC-LOG-007 Login dengan username dan password salah', () => {

        cy.get('input[name="username"]')
            .type(data.invalidBoth.username)

        cy.get('input[name="password"]')
            .type(data.invalidBoth.password)

        cy.get('button[type="submit"]')
            .click()

        cy.contains('Invalid credentials')
            .should('be.visible')

    })


    //====================================================
    // TC-008 USERNAME KARAKTER KHUSUS
    //====================================================

    it('TC-LOG-008 Login dengan karakter khusus', () => {

        cy.get('input[name="username"]')
            .type(data.specialCharacter.username)

        cy.get('input[name="password"]')
            .type(data.specialCharacter.password)

        cy.get('button[type="submit"]')
            .click()

        cy.contains('Invalid credentials')
            .should('be.visible')

    })


    //====================================================
    // TC-009 LEADING SPACE
    //====================================================

    it('TC-LOG-009 Login dengan spasi di depan username', () => {

        cy.get('input[name="username"]')
            .type(data.leadingSpace.username)

        cy.get('input[name="password"]')
            .type(data.leadingSpace.password)

        cy.get('button[type="submit"]')
            .click()

        cy.contains('Invalid credentials')
            .should('be.visible')

    })


    //====================================================
    // TC-010 TRAILING SPACE
    //====================================================

    it('TC-LOG-010 Login dengan spasi di belakang username', () => {

        cy.get('input[name="username"]')
            .type(data.trailingSpace.username)

        cy.get('input[name="password"]')
            .type(data.trailingSpace.password)

        cy.get('button[type="submit"]')
            .click()

        cy.url()
            .should('include', '/dashboard')

        cy.contains('Dashboard')
            .should('be.visible')

    })


    //====================================================
    // TC-011 UPPERCASE USERNAME
    //====================================================

    it('TC-LOG-011 Login dengan username huruf kapital', () => {

        cy.get('input[name="username"]')
            .type(data.uppercaseUsername.username)

        cy.get('input[name="password"]')
            .type(data.uppercaseUsername.password)

        cy.get('button[type="submit"]')
            .click()

        cy.url()
            .should('include', '/dashboard')

        cy.contains('Dashboard')
            .should('be.visible')

    })


    //====================================================
    // TC-012 UPPERCASE PASSWORD
    //====================================================

    it('TC-LOG-012 Login dengan password huruf kapital', () => {

        cy.get('input[name="username"]')
            .type(data.uppercasePassword.username)

        cy.get('input[name="password"]')
            .type(data.uppercasePassword.password)

        cy.get('button[type="submit"]')
            .click()

        cy.contains('Invalid credentials')
            .should('be.visible')

    })


    //====================================================
    // TC-013 LOGIN MENGGUNAKAN TOMBOL ENTER
    //====================================================

    it('TC-LOG-013 Login menggunakan tombol Enter', () => {

        cy.get('input[name="username"]')
            .type(data.enterLogin.username)

        cy.get('input[name="password"]')
            .type(data.enterLogin.password + '{enter}')

        cy.url()
            .should('include', '/dashboard')

        cy.contains('Dashboard')
            .should('be.visible')

    })


    //====================================================
    // TC-014 AKSES DASHBOARD TANPA LOGIN
    //====================================================

    it('TC-LOG-014 Akses Dashboard tanpa login', () => {

        cy.visit(data.dashboardUrl.url)

        cy.url()
            .should('include', '/auth/login')

        cy.get('input[name="username"]')
            .should('be.visible')

        cy.get('input[name="password"]')
            .should('be.visible')

    })

})

