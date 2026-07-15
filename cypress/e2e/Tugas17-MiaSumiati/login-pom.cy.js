const LoginPage = require('./pages/LoginPage')
const DashboardPage = require('./pages/DashboardPage')

describe('OrangeHRM Login Automation - POM', () => {

    let data

    before(() => {
        cy.fixture('../e2e/Tugas17-MiaSumiati/data/loginData')
            .then((loginData) => {
                data = loginData
            })
    })

    beforeEach(() => {

        LoginPage.visit()
        LoginPage.verifyLoginPage()

    })

    it('TC-LOG-001 Login dengan username dan password valid', () => {
        LoginPage.login(
            data.validUser.username,
            data.validUser.password
        )
        DashboardPage.verifyDashboard()
    })

    it('TC-LOG-002 Login dengan username kosong', () => {
        LoginPage.inputPassword(data.validUser.password)
        LoginPage.clickLogin()
        LoginPage.verifyRequiredMessage()
    })

    it('TC-LOG-003 Login dengan password kosong', () => {
        LoginPage.inputUsername(data.validUser.username)
        LoginPage.clickLogin()
        LoginPage.verifyRequiredMessage()
    })

    it('TC-LOG-004 Login dengan username dan password kosong', () => {
        LoginPage.clickLogin()
        LoginPage.verifyRequiredMessages()
    })

    it('TC-LOG-005 Login dengan password salah', () => {
        LoginPage.login(
            data.invalidPassword.username,
            data.invalidPassword.password
        )
        LoginPage.verifyInvalidCredential()
    })

    it('TC-LOG-006 Login dengan username salah', () => {
    LoginPage.login(
        data.invalidUsername.username,
        data.invalidUsername.password
        )
        LoginPage.verifyInvalidCredential()
    })

    it('TC-LOG-007 Login dengan username dan password salah', () => {
        LoginPage.login(
            data.invalidBoth.username,
            data.invalidBoth.password
        )
        LoginPage.verifyInvalidCredential()
    })

    it('TC-LOG-008 Login dengan karakter khusus', () => {
        LoginPage.login(
            data.specialCharacter.username,
            data.specialCharacter.password
        )
        LoginPage.verifyInvalidCredential()
    })

    it('TC-LOG-009 Login dengan spasi di depan username', () => {
        LoginPage.login(
            data.leadingSpace.username,
            data.leadingSpace.password
        )
        LoginPage.verifyInvalidCredential()
    })

    it('TC-LOG-010 Login dengan spasi di belakang username', () => {
        LoginPage.login(
            data.trailingSpace.username,
            data.trailingSpace.password
        )
        DashboardPage.verifyDashboard()
    })

    it('TC-LOG-011 Login dengan username huruf kapital', () => {
        LoginPage.login(
            data.uppercaseUsername.username,
            data.uppercaseUsername.password
        )
        DashboardPage.verifyDashboard()
    })

    it('TC-LOG-012 Login dengan password huruf kapital', () => {
        LoginPage.login(
            data.uppercasePassword.username,
            data.uppercasePassword.password
        )
        LoginPage.verifyInvalidCredential()
    })

    it('TC-LOG-013 Login menggunakan tombol Enter', () => {
        LoginPage.loginWithEnter(
            data.enterLogin.username,
            data.enterLogin.password
        )
        DashboardPage.verifyDashboard()
    })

    it('TC-LOG-014 Akses Dashboard tanpa login', () => {
        LoginPage.visitDashboardWithoutLogin()
        LoginPage.verifyRedirectToLogin()
    })

})