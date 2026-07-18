const LoginPage = require('./pages/LoginPage')
const DashboardPage = require('./pages/DashboardPage')
const DirectoryPage = require('./pages/DirectoryPage')

describe('OrangeHRM Directory Automation - POM & Intercept', () => {

    let loginData
    let directoryData

    before(() => {
        cy.readFile(
            'cypress/e2e/TugasFinal-MiaSumiati/data/loginData.json'
        ).then((data) => {
            loginData = data
        })

        cy.readFile(
            'cypress/e2e/TugasFinal-MiaSumiati/data/directoryData.json'
        ).then((data) => {
            directoryData = data
        })
    })

    it('TC-DIR-001 Verifikasi Pencarian Data Karyawan Tanpa Filter', () => {
        LoginPage.loginAsAdmin(
            loginData.validUser.username,
            loginData.validUser.password
        )
        DashboardPage.verifyDashboard()
        DashboardPage.clickDirectory()
        cy.intercept('GET','**/web/index.php/api/v2/directory/employees*').as('directory')
        DirectoryPage.clickSearch()
        cy.wait('@directory').its('response.statusCode').should('eq', 200)
        DirectoryPage.verifyDirectoryLoaded()
    })

    it('TC-DIR-002 Verifikasi Reset Filter Pencarian', () => {
        LoginPage.loginAsAdmin(
            loginData.validUser.username,
            loginData.validUser.password
        )
        DashboardPage.verifyDashboard()
        DashboardPage.clickDirectory()
        cy.intercept('GET','**/web/index.php/api/v2/directory/employees*').as('resetDirectory')
        DirectoryPage.clickJobTitle()
        DirectoryPage.selectFirstJobTitle()
        DirectoryPage.clickLocation()
        DirectoryPage.selectFirstLocation()
        DirectoryPage.clickReset()
        cy.wait('@resetDirectory').its('response.statusCode').should('eq', 200)
        DirectoryPage.verifyResetFilter()
    })

    it('TC-DIR-003 Verifikasi Pencarian Data Karyawan Berdasarkan Job Title', () => {
        LoginPage.loginAsAdmin(
            loginData.validUser.username,
            loginData.validUser.password
        )
        DashboardPage.verifyDashboard()
        DashboardPage.clickDirectory()
        cy.intercept('GET','**/web/index.php/api/v2/directory/employees*').as('searchJobTitle')
        DirectoryPage.clickJobTitle()
        DirectoryPage.selectJobTitle(directoryData.jobTitle.valid)
        DirectoryPage.clickSearch()
        cy.wait('@searchJobTitle').its('response.statusCode').should('eq', 200)
        DirectoryPage.verifyDirectoryLoaded()

    })

    it('TC-DIR-004 Verifikasi Pencarian Data Karyawan Berdasarkan Location', () => {

        LoginPage.loginAsAdmin(
            loginData.validUser.username,
            loginData.validUser.password
        )
        DashboardPage.verifyDashboard()
        DashboardPage.clickDirectory()
        cy.intercept('GET','**/web/index.php/api/v2/directory/employees*').as('searchLocation')
        DirectoryPage.clickLocation()
        DirectoryPage.selectLocation(directoryData.location.valid)
        DirectoryPage.clickSearch()
        cy.wait('@searchLocation').its('response.statusCode').should('eq', 200)
        DirectoryPage.verifyDirectoryLoaded()
    })

    it('TC-DIR-005 Verifikasi Pencarian Data Karyawan Berdasarkan Job Title dan Location', () => {

        LoginPage.loginAsAdmin(
            loginData.validUser.username,
            loginData.validUser.password
        )
        DashboardPage.verifyDashboard()
        DashboardPage.clickDirectory()
        cy.intercept('GET','**/web/index.php/api/v2/directory/employees*').as('searchFilter')
        DirectoryPage.clickJobTitle()
        DirectoryPage.selectFirstJobTitle()
        DirectoryPage.clickLocation()
        DirectoryPage.selectFirstLocation()
        DirectoryPage.clickSearch()
        cy.wait('@searchFilter').its('response.statusCode').should('eq',200)
        DirectoryPage.verifyDirectoryLoaded()
    })

    it('TC-DIR-006 Verifikasi Reset Filter Setelah Melakukan Pencarian', () => {
        LoginPage.loginAsAdmin(
            loginData.validUser.username,
            loginData.validUser.password
        )
        DashboardPage.verifyDashboard()
        DashboardPage.clickDirectory()
        cy.intercept('GET','**/web/index.php/api/v2/directory/employees*').as('resetAfterSearch')
        DirectoryPage.clickJobTitle()
        DirectoryPage.selectFirstJobTitle()
        DirectoryPage.clickSearch()
        DirectoryPage.clickReset()
        cy.wait('@resetAfterSearch').its('response.statusCode').should('eq', 200)
        DirectoryPage.verifyResetFilter()
    })

    it('TC-DIR-007 Verifikasi Pencarian Data Karyawan Menggunakan Karakter Khusus', () => {
        LoginPage.loginAsAdmin(
            loginData.validUser.username,
            loginData.validUser.password
        )
        DashboardPage.verifyDashboard()
        DashboardPage.clickDirectory()
        cy.intercept('GET','**/web/index.php/api/v2/directory/employees*').as('specialCharacter')
        DirectoryPage.inputEmployeeName(
            directoryData.employee.specialCharacter
        )
        DirectoryPage.clickSearch()
        cy.wait('@specialCharacter').its('response.statusCode').should('eq',200)
        DirectoryPage.verifyDirectoryLoaded()
    })

    it('TC-DIR-008 Verifikasi Pencarian Data Karyawan Menggunakan Angka', () => {
        LoginPage.loginAsAdmin(
            loginData.validUser.username,
            loginData.validUser.password
        )
        DashboardPage.verifyDashboard()
        DashboardPage.clickDirectory()
        cy.intercept('GET','**/web/index.php/api/v2/directory/employees*').as('searchNumber')
        DirectoryPage.inputEmployeeName(
            directoryData.employee.number
        )
        DirectoryPage.clickSearch()
        cy.wait('@searchNumber').its('response.statusCode').should('eq',200)
        DirectoryPage.verifyDirectoryLoaded()
    })

    it('TC-DIR-009 Verifikasi Pencarian Data Karyawan Menggunakan Spasi', () => {
        LoginPage.loginAsAdmin(
            loginData.validUser.username,
            loginData.validUser.password
        )
        DashboardPage.verifyDashboard()
        DashboardPage.clickDirectory()
        cy.intercept('GET','**/web/index.php/api/v2/directory/employees*').as('searchSpace')
        DirectoryPage.inputEmployeeName(
            directoryData.employee.space
        )
        DirectoryPage.clickSearch()
        cy.wait('@searchSpace').its('response.statusCode').should('eq',200)
        DirectoryPage.verifyDirectoryLoaded()
    })

    it('TC-DIR-010 Verifikasi Halaman Directory Berhasil Dimuat Ulang (Refresh)', () => {
        LoginPage.loginAsAdmin(
            loginData.validUser.username,
            loginData.validUser.password
        )
        DashboardPage.verifyDashboard()
        DashboardPage.clickDirectory()
        cy.intercept('GET','**/web/index.php/api/v2/directory/employees*').as('refreshDirectory')
        cy.reload()
        cy.wait('@refreshDirectory').its('response.statusCode').should('eq', 200)
        DirectoryPage.verifyDirectoryLoaded()
    })

})