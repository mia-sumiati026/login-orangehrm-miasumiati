describe('OrangeHRM Login Automation-Intercept', () => {

    let data

    before(() => {
        cy.fixture('loginData').then((loginData) => {
            data = loginData
        })
    })

    it('TC-LOG-001 Login dengan username dan password valid', () => {
        cy.visit('/web/index.php/auth/login')
        cy.get('input[name="username"]').type(data.validUser.username)
        cy.get('input[name="password"]').type(data.validUser.password)
        cy.intercept('GET','**/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')

        cy.get('button[type="submit"]').click()
        cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/dashboard')
    })

    it('TC-LOG-002 Login dengan username kosong', () => {
        cy.intercept('GET','**/web/index.php/auth/login').as('loginPage')
        cy.visit('/web/index.php/auth/login')
        cy.wait('@loginPage').its('response.statusCode').should('eq', 200)

        cy.get('input[name="password"]').type(data.validUser.password)
        cy.get('button[type="submit"]').click()
        cy.contains('Required').should('be.visible')
    })

    it('TC-LOG-003 Login dengan password kosong', () => {
        cy.intercept('GET','**/web/index.php/auth/login').as('loginPage')
        cy.visit('/web/index.php/auth/login')
        cy.wait('@loginPage').its('response.statusCode').should('eq', 200)

        cy.get('input[name="username"]').type(data.validUser.username)
        cy.get('button[type="submit"]').click()
        cy.contains('Required').should('be.visible')
    })

    it('TC-LOG-004 Login dengan username dan password kosong', () => {
        cy.intercept('GET','**/web/index.php/auth/login').as('loginPage')
        cy.visit('/web/index.php/auth/login')
        cy.wait('@loginPage').its('response.statusCode').should('eq', 200)

        cy.get('button[type="submit"]').click()
        cy.get('span.oxd-input-field-error-message').should('have.length', 2)
    })

    it('TC-LOG-005 Login dengan password salah', () => {
        cy.visit('/web/index.php/auth/login')
        cy.get('input[name="username"]').type(data.invalidPassword.username)
        cy.get('input[name="password"]').type(data.invalidPassword.password)
        cy.intercept('POST','**/web/index.php/auth/validate').as('wrongPassword')

        cy.get('button[type="submit"]').click()
        cy.wait('@wrongPassword').its('response.statusCode').should('eq', 302)
        cy.contains('Invalid credentials').should('be.visible')
    })

    it('TC-LOG-006 Login dengan username salah', () => {
        cy.visit('/web/index.php/auth/login')
        cy.get('input[name="username"]').type(data.invalidUsername.username)
        cy.get('input[name="password"]').type(data.invalidUsername.password)
        cy.intercept('POST','**/web/index.php/auth/validate').as('wrongUsername')

        cy.get('button[type="submit"]').click()
        cy.wait('@wrongUsername').its('response.statusCode').should('eq', 302)
        cy.contains('Invalid credentials').should('be.visible')

    })

    it('TC-LOG-007 Login dengan username dan password salah', () => {
        cy.visit('/web/index.php/auth/login')
        cy.get('input[name="username"]').type(data.invalidBoth.username)
        cy.get('input[name="password"]').type(data.invalidBoth.password)
        cy.intercept('POST','**/web/index.php/auth/validate').as('wrongCredential')

        cy.get('button[type="submit"]').click()
        cy.wait('@wrongCredential').its('response.statusCode').should('eq', 302)
        cy.contains('Invalid credentials').should('be.visible')
    })

    it('TC-LOG-008 Login dengan karakter khusus', () => {
        cy.visit('/web/index.php/auth/login')
        cy.get('input[name="username"]').type(data.specialCharacter.username)
        cy.get('input[name="password"]').type(data.specialCharacter.password)
        cy.intercept('POST','**/web/index.php/auth/validate').as('specialCharacter')

        cy.get('button[type="submit"]').click()
        cy.wait('@specialCharacter').its('response.statusCode').should('eq', 302)
        cy.contains('Invalid credentials').should('be.visible')
    })

    it('TC-LOG-009 Login dengan spasi di depan username', () => {
        cy.visit('/web/index.php/auth/login')
        cy.get('input[name="username"]').type(data.leadingSpace.username)
        cy.get('input[name="password"]').type(data.leadingSpace.password)
        cy.intercept('POST','**/web/index.php/auth/validate').as('leadingSpace')

        cy.get('button[type="submit"]').click()
        cy.wait('@leadingSpace').its('response.statusCode').should('eq', 302)
        cy.contains('Invalid credentials').should('be.visible')
    })

    it('TC-LOG-010 Login dengan spasi di belakang username', () => {
        cy.visit('/web/index.php/auth/login')
        cy.get('input[name="username"]').type(data.trailingSpace.username)
        cy.get('input[name="password"]').type(data.trailingSpace.password)
        cy.intercept('GET','**/web/index.php/api/v2/dashboard/shortcuts').as('dashboardShortcut')

        cy.get('button[type="submit"]').click()
        cy.wait('@dashboardShortcut').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })

    it('TC-LOG-011 Login dengan username huruf kapital', () => {
        cy.visit('/web/index.php/auth/login')
        cy.get('input[name="username"]').type(data.uppercaseUsername.username)
        cy.get('input[name="password"]').type(data.uppercaseUsername.password)
        cy.intercept('GET','**/web/index.php/api/v2/dashboard/employees/subunit').as('employeeSubunit')

        cy.get('button[type="submit"]').click()
        cy.wait('@employeeSubunit').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })


    it('TC-LOG-012 Login dengan password huruf kapital', () => {
        cy.visit('/web/index.php/auth/login')
        cy.get('input[name="username"]').type(data.uppercasePassword.username)
        cy.get('input[name="password"]').type(data.uppercasePassword.password)
        cy.intercept('POST','**/web/index.php/auth/validate').as('uppercasePassword')

        cy.get('button[type="submit"]').click()
        cy.wait('@uppercasePassword').its('response.statusCode').should('eq', 302)
        cy.contains('Invalid credentials').should('be.visible')
    })

    it('TC-LOG-013 Login menggunakan tombol Enter', () => {
        cy.visit('/web/index.php/auth/login')
        cy.get('input[name="username"]').type(data.enterLogin.username)
        cy.intercept('GET','**/web/index.php/api/v2/dashboard/employees/action-summary').as('loginEnter')
        cy.get('input[name="password"]').type(data.enterLogin.password + '{enter}')

        cy.wait('@loginEnter').its('response.statusCode').should('eq', 200)
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })

    it('TC-LOG-014 Akses Dashboard tanpa login', () => {
        cy.intercept('GET','**/web/index.php/dashboard/index').as('dashboard')
        cy.visit('/web/index.php/dashboard/index')
        cy.wait('@dashboard').its('response.statusCode').should('eq', 302)
        cy.url().should('include', '/auth/login')
    })
})
