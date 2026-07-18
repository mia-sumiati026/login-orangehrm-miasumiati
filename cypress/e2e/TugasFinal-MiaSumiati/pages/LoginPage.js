class LoginPage {

    visit() {

        cy.visit('/web/index.php/auth/login')

    }

    verifyLoginPage() {

        cy.get('input[name="username"]')
            .should('be.visible')

    }

    verifyRedirectToLogin() {

        cy.url()
            .should('include', '/auth/login')

        cy.get('input[name="username"]')
            .should('be.visible')

    }

    inputUsername(username) {

        cy.get('input[name="username"]')
            .clear()
            .type(username)

    }

    inputPassword(password) {

        cy.get('input[name="password"]')
            .clear()
            .type(password)

    }

    clickLogin() {

        cy.get('button[type="submit"]')
            .click()

    }

    login(username, password) {

        this.inputUsername(username)
        this.inputPassword(password)
        this.clickLogin()

    }

    loginAsAdmin(username, password) {

        this.visit()
        this.login(username, password)

    }

    verifyRequiredMessage() {

        cy.contains('Required')
            .should('be.visible')

    }

    verifyInvalidCredential() {

        cy.contains('Invalid credentials')
            .should('be.visible')

    }

    verifyRequiredMessages() {

        cy.get('span.oxd-input-field-error-message')
            .should('have.length', 2)

    }

    loginWithEnter(username, password) {

        this.inputUsername(username)

        cy.get('input[name="password"]')
            .type(password + '{enter}')

    }

    visitDashboardWithoutLogin() {

        cy.visit('/web/index.php/dashboard/index')

    }

}

module.exports = new LoginPage()