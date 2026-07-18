const LoginPage = require('./pages/LoginPage')
const DashboardPage = require('./pages/DashboardPage')

describe('OrangeHRM Login Automation - POM & Intercept', () => {

    let data

    before(() => {
        cy.fixture('loginData').then((loginData) => {
            data = loginData
        })
    })

    it('TC-LOG-001 Login dengan username dan password valid', () => {
        LoginPage.visit()
        cy.intercept('GET','**/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')
        LoginPage.login(
            data.validUser.username,
            data.validUser.password
        )
        cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)
        DashboardPage.verifyDashboard()
    })

    it('TC-LOG-002 Login dengan username kosong', () => {
        cy.intercept('GET','**/web/index.php/auth/login').as('loginPage')
        LoginPage.visit()
        cy.wait('@loginPage').its('response.statusCode').should('eq', 200)
        LoginPage.inputPassword(data.validUser.password)
        LoginPage.clickLogin()
        LoginPage.verifyRequiredMessage()
    })

    it('TC-LOG-003 Login dengan password kosong', () => {
        cy.intercept('GET','**/web/index.php/auth/login').as('loginPage')
        LoginPage.visit()
        cy.wait('@loginPage').its('response.statusCode').should('eq', 200)
        LoginPage.inputPassword(data.validUser.username)
        LoginPage.clickLogin()
        LoginPage.verifyRequiredMessage()
    })

    it('TC-LOG-004 Login dengan username dan password kosong', () => {
        cy.intercept('GET','**/web/index.php/auth/login').as('loginPage')
        LoginPage.visit()
        cy.wait('@loginPage').its('response.statusCode').should('eq', 200) 
        LoginPage.clickLogin()
        LoginPage.verifyRequiredMessages()
    })

    it('TC-LOG-005 Login dengan password salah', () => {
        LoginPage.visit()
        cy.intercept('POST', '**/web/index.php/auth/validate').as('wrongPassword')
        LoginPage.login(
            data.invalidPassword.username,
            data.invalidPassword.password
        )
        cy.wait('@wrongPassword').its('response.statusCode').should('eq', 302)
        LoginPage.verifyInvalidCredential()
    })

    it('TC-LOG-006 Login dengan username salah', () => {
        LoginPage.visit()
        cy.intercept('POST', '**/web/index.php/auth/validate').as('wrongUsername')
        LoginPage.login(
            data.invalidUsername.username,
            data.invalidUsername.password
        )
        cy.wait('@wrongUsername').its('response.statusCode').should('eq', 302)
        LoginPage.verifyInvalidCredential()
    })

    it('TC-LOG-007 Login dengan username dan password salah', () => {
        LoginPage.visit()
        cy.intercept('POST', '**/web/index.php/auth/validate').as('wrongCredential')
        LoginPage.login(
            data.invalidBoth.username,
            data.invalidBoth.password
        )
        cy.wait('@wrongCredential').its('response.statusCode').should('eq', 302)
        LoginPage.verifyInvalidCredential()
    })

    it('TC-LOG-008 Login dengan karakter khusus', () => {
        LoginPage.visit()
        cy.intercept('POST', '**/web/index.php/auth/validate').as('specialCharacter')
        LoginPage.login(
            data.specialCharacter.username,
            data.specialCharacter.password
        )
        cy.wait('@specialCharacter').its('response.statusCode').should('eq', 302)
        LoginPage.verifyInvalidCredential()
    })

    it('TC-LOG-009 Login dengan spasi di depan username', () => {
        LoginPage.visit()
        cy.intercept('POST', '**/web/index.php/auth/validate').as('leadingSpace')
        LoginPage.login(
            data.leadingSpace.username,
            data.leadingSpace.password
        )
        cy.wait('@leadingSpace').its('response.statusCode').should('eq', 302)
        LoginPage.verifyInvalidCredential()
    })

    it('TC-LOG-010 Login dengan spasi di belakang username', () => {
        LoginPage.visit()
        cy.intercept('GET', '**/web/index.php/api/v2/dashboard/shortcuts').as('dashboardShortcut')
        LoginPage.login(
            data.trailingSpace.username,
            data.trailingSpace.password
        )
        cy.wait('@dashboardShortcut').its('response.statusCode').should('eq', 200)
        DashboardPage.verifyDashboard()
    })

    it('TC-LOG-011 Login dengan username huruf kapital', () => {
        LoginPage.visit()
        cy.intercept('GET', '**/web/index.php/api/v2/dashboard/employees/subunit').as('employeeSubunit')
        LoginPage.login(
            data.uppercaseUsername.username,
            data.uppercaseUsername.password
        )
        cy.wait('@employeeSubunit').its('response.statusCode').should('eq', 200)
        DashboardPage.verifyDashboard()
    })

    it('TC-LOG-012 Login dengan password huruf kapital', () => {
        LoginPage.visit()
        cy.intercept('POST', '**/web/index.php/auth/validate').as('uppercasePassword')
        LoginPage.login(
            data.uppercasePassword.username,
            data.uppercasePassword.password
        )
        cy.wait('@uppercasePassword').its('response.statusCode').should('eq', 302)
        LoginPage.verifyInvalidCredential()
    })

    it('TC-LOG-013 Login menggunakan tombol Enter', () => {
        LoginPage.visit()
        cy.intercept('GET', '**/web/index.php/api/v2/dashboard/employees/action-summary').as('loginEnter')
        LoginPage.loginWithEnter(
            data.enterLogin.username,
            data.enterLogin.password
        )
        cy.wait('@loginEnter').its('response.statusCode').should('eq', 200)
        DashboardPage.verifyDashboard()
    })

    it('TC-LOG-014 Akses Dashboard tanpa login', () => {
        cy.intercept('GET', '**/web/index.php/dashboard/index').as('dashboard')
        LoginPage.visitDashboardWithoutLogin()
        cy.wait('@dashboard').its('response.statusCode').should('eq', 302)
        LoginPage.verifyRedirectToLogin()
    })

})