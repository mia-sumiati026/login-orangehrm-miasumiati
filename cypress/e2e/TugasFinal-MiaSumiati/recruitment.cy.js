const LoginPage = require('./pages/LoginPage')
const DashboardPage = require('./pages/DashboardPage')
const RecruitmentPage = require('./pages/RecruitmentPage')

describe('OrangeHRM Recruitment Automation - POM & Intercept', () => {

    let loginData
    let recruitmentData
    let uniqueCandidate
    let uniqueVacancy

    before(() => {

        cy.fixture('loginData').then((data) => {
            loginData = data
        })

        cy.readFile(
            'cypress/e2e/TugasFinal-MiaSumiati/data/recruitmentData.json'
        ).then((data) => {

            recruitmentData = data

            uniqueCandidate = {
                firstName: `${data.candidate.firstName}${Date.now()}`,
                lastName: data.candidate.lastName,
                email: `mia${Date.now()}@gmail.com`
            }

            uniqueVacancy = `${data.vacancy.name} ${Date.now()}`
        })

    })

    beforeEach(() => {
        LoginPage.visit()
        LoginPage.verifyLoginPage()
        LoginPage.inputUsername(loginData.validUser.username)
        LoginPage.inputPassword(loginData.validUser.password)
        cy.intercept('POST', '**/auth/validate').as('login')
        LoginPage.clickLogin()
        cy.wait('@login')
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })

    it('TC-REC-001 - Verifikasi Akses Menu Recruitment', () => {
        cy.intercept('GET', '**/recruitment/**').as('recruitment')
        cy.contains('Recruitment').click()
        cy.wait('@recruitment')
        RecruitmentPage.verifyRecruitmentPage()
    })

    it('TC-REC-002 - Verifikasi Penambahan Data Kandidat Baru', () => {
        cy.contains('Recruitment').click()
        RecruitmentPage.clickAddCandidate()
        RecruitmentPage.inputFirstName(uniqueCandidate.firstName)
        RecruitmentPage.inputLastName(uniqueCandidate.lastName)
        RecruitmentPage.inputFirstName(uniqueCandidate.firstName)

        RecruitmentPage.selectVacancy(recruitmentData.vacancy.name)

        RecruitmentPage.inputEmail(uniqueCandidate.email)
        RecruitmentPage.inputContactNumber('08123456789')
        RecruitmentPage.inputKeywords('Cypress')
        RecruitmentPage.inputComment('Automation Testing')
        RecruitmentPage.uploadResume('resume.pdf')
        RecruitmentPage.checkConsent()
        cy.intercept('POST', '**/recruitment/**').as('saveCandidate')
        RecruitmentPage.clickSave()
        cy.wait('@saveCandidate')
        RecruitmentPage.verifySuccessToast()
    })


    it('TC-REC-003 - Verifikasi Fitur Pencarian Kandidat', () => {
        cy.contains('Recruitment').click()
        RecruitmentPage.searchCandidate(uniqueCandidate.firstName)
        cy.intercept('GET', '**/recruitment/**').as('searchCandidate')
        RecruitmentPage.clickSearch()
        cy.wait('@searchCandidate')
        cy.contains(uniqueCandidate.firstName).should('be.visible')
    })

    it('TC-REC-004 - Verifikasi Tampilan Preview Informasi Kandidat', () => {
        cy.contains('Recruitment').click()
        RecruitmentPage.searchCandidate(uniqueCandidate.firstName)
        cy.intercept('GET', '**/recruitment/**').as('searchCandidate')
        RecruitmentPage.clickSearch()
        cy.wait('@searchCandidate')
        RecruitmentPage.clickPreviewFirstCandidate()
        cy.url().should('include', '/recruitment/addCandidate')
    })

    it('TC-REC-005 - Verifikasi Proses Shortlist Kandidat', () => {
        cy.contains('Recruitment').click()
        RecruitmentPage.searchCandidate(uniqueCandidate.firstName)
        RecruitmentPage.clickSearch()
        RecruitmentPage.clickPreviewCandidate(uniqueCandidate.firstName)
        cy.contains('button', 'Shortlist').should('be.visible').click()
        cy.get('textarea:not([disabled])').type('Candidate passed initial screening')
        cy.intercept('PUT','**/api/v2/recruitment/candidates/**').as('shortlist')
        RecruitmentPage.clickSave()
        cy.wait('@shortlist').its('response.statusCode').should('eq', 200)
        cy.contains('Status: Shortlisted').should('be.visible')
        cy.contains('Schedule Interview').should('be.visible')
    })

    it('TC-REC-006 - Verifikasi Proses Reject Kandidat', () => {
        cy.contains('Recruitment').click()
        RecruitmentPage.searchCandidate(uniqueCandidate.firstName)
        RecruitmentPage.clickSearch()
        RecruitmentPage.clickPreviewCandidate(uniqueCandidate.firstName)
        cy.contains('button', 'Reject').should('be.visible').click()
        cy.get('textarea:not([disabled])').type('Candidate rejected')
        cy.intercept('PUT','**/api/v2/recruitment/candidates/**').as('reject')
        cy.contains('button', 'Save').click()
        cy.wait('@reject').its('response.statusCode').should('eq', 200)
        RecruitmentPage.verifySuccessToast()
    })

    it('TC-REC-007 - Verifikasi Penghapusan Data Kandidat', () => {
        cy.contains('Recruitment').click()
        RecruitmentPage.searchCandidate(uniqueCandidate.firstName)
        RecruitmentPage.clickSearch()
        RecruitmentPage.clickDeleteFirstCandidate()
        cy.intercept('DELETE', '**/recruitment/**').as('deleteCandidate')
        RecruitmentPage.confirmDelete()
        cy.wait('@deleteCandidate')
        RecruitmentPage.verifySuccessToast()
    })

    it('TC-REC-008 - Verifikasi Akses Menu Vacancy', () => {
        cy.contains('Recruitment').click()
        RecruitmentPage.clickVacanciesTab()
        cy.url().should('include', '/recruitment/viewJobVacancy')
    })

    it('TC-REC-009 - Verifikasi Penambahan Data Vacancy Baru', () => {
        cy.contains('Recruitment').click()
        RecruitmentPage.clickVacanciesTab()
        RecruitmentPage.clickAddVacancy()
        RecruitmentPage.inputVacancyName(uniqueVacancy)
        RecruitmentPage.selectJobTitle(recruitmentData.jobTitle.name)
        RecruitmentPage.inputDescription('Automation Vacancy')
        RecruitmentPage.inputHiringManager(recruitmentData.hiringManager.name)
        RecruitmentPage.inputNumberPosition('2')
        cy.intercept('POST','**/api/v2/recruitment/vacancies').as('saveVacancy')
        RecruitmentPage.clickSave()
        cy.wait('@saveVacancy').its('response.statusCode').should('eq', 200)
        cy.contains('Edit Vacancy').should('exist')
    })

    it('TC-REC-010 - Verifikasi Perubahan/Edit Data Vacancy', () => {
        cy.contains('Recruitment').click()
        RecruitmentPage.clickVacanciesTab()
        RecruitmentPage.clickEditVacancy(uniqueVacancy)
        RecruitmentPage.inputDescription('Updated Automation Vacancy')
        cy.intercept('PUT','**/api/v2/recruitment/vacancies/**').as('editVacancy')
        RecruitmentPage.clickSave()
        cy.wait('@editVacancy').its('response.statusCode').should('eq', 200)
        RecruitmentPage.verifySuccessToast()
    })

    it('TC-REC-011 - Verifikasi Penghapusan Data Vacancy', () => {
        cy.contains('Recruitment').click()
        RecruitmentPage.clickVacanciesTab()
        RecruitmentPage.clickDeleteVacancy(uniqueVacancy)
        cy.intercept('DELETE','**/api/v2/recruitment/vacancies*').as('deleteVacancy')
        RecruitmentPage.confirmDelete()
        cy.wait('@deleteVacancy').its('response.statusCode').should('eq', 200)
        RecruitmentPage.verifySuccessToast()

    })

})