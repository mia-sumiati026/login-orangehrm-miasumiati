class RecruitmentPage {

    verifyRecruitmentPage() {
        cy.url().should('include', '/recruitment/viewCandidates')
        cy.contains('Recruitment').should('be.visible')
    }

    // ==========================
    // Candidates
    // ==========================

    clickCandidatesTab() {
        cy.contains('Candidates').click()
    }

    clickAddCandidate() {
        cy.contains('button', 'Add').click()
    }

    inputFirstName(firstName) {
        cy.get('input[name="firstName"]')
            .clear()
            .type(firstName)
    }

    inputMiddleName(middleName) {
        cy.get('input[name="middleName"]')
            .clear()
            .type(middleName)
    }

    inputLastName(lastName) {
        cy.get('input[name="lastName"]')
            .clear()
            .type(lastName)
    }

    inputEmail(email) {
        cy.contains('label', 'Email')
            .parents('.oxd-input-group')
            .find('input')
            .clear()
            .type(email)
    }

    inputContactNumber(number) {
        cy.contains('label', 'Contact Number')
            .parents('.oxd-input-group')
            .find('input')
            .clear()
            .type(number)
    }

    inputKeywords(keyword) {
        cy.contains('label', 'Keywords')
            .parents('.oxd-input-group')
            .find('input')
            .clear()
            .type(keyword)
    }

    inputDate(date) {
        cy.get('input[placeholder="yyyy-dd-mm"]')
            .clear()
            .type(date)
    }

    inputComment(comment) {
        cy.get('textarea')
            .clear()
            .type(comment)
    }

    uploadResume(fileName) {
        cy.get('input[type="file"]')
            .selectFile(`cypress/fixtures/${fileName}`, {
                force: true
            })
    }

    checkConsent() {
        cy.get('input[type="checkbox"]')
            .check({ force: true })
    }

    clickSave() {
        cy.contains('button', 'Save').click()
    }

    clickSearch() {
        cy.contains('button', 'Search').click()
    }

    clickReset() {
        cy.contains('button', 'Reset').click()
    }

    searchCandidate(name) {
        cy.get('.oxd-autocomplete-text-input input')
            .clear()
            .type(name)
    }

    clickPreviewCandidate(candidateName) {

        cy.contains('.oxd-table-row', candidateName)
            .find('i.bi-eye-fill')
            .click()

    }

    clickPreviewFirstCandidate() {

        cy.get('i.bi-eye-fill')
            .first()
            .click()

        cy.url()
            .should('include', '/recruitment/addCandidate')

        cy.contains('Application Stage')
            .should('be.visible')

    }

    clickShortlist() {
        cy.contains('button', 'Shortlist').click()
    }

    clickReject() {
        cy.contains('button', 'Reject').click()
    }

        clickCandidatesTab() {
        cy.contains('Candidates').click()
    }

    clickDeleteFirstCandidate() {
        cy.get('i.bi-trash')
            .first()
            .click()
    }

    confirmDelete() {
        cy.contains('button', 'Yes, Delete')
            .click()
    }

    // ==========================
    // Vacancies
    // ==========================

    clickVacanciesTab() {
        cy.contains('Vacancies').click()
    }

    selectVacancy(vacancyName) {

        cy.get('.oxd-select-text')
            .first()
            .click()

        cy.contains('.oxd-select-option', vacancyName)
            .should('be.visible')
            .click()

        }

    clickAddVacancy() {
        
        cy.contains('button', 'Add').click()
    }

    inputVacancyName(name) {

        cy.contains('label', 'Vacancy Name')
            .parents('.oxd-input-group')
            .find('input')
            .clear()
            .type(name)
    }

    selectJobTitle(jobTitle) {

        cy.contains('label', 'Job Title')
            .parents('.oxd-input-group')
            .find('.oxd-select-text')
            .click()

        cy.contains('.oxd-select-option', jobTitle)
            .click()

    }

    inputDescription(description) {
        cy.contains('label', 'Description')
            .parents('.oxd-input-group')
            .find('textarea')
            .clear()
            .type(description)
    }

    inputHiringManager(manager) {

        cy.contains('label', 'Hiring Manager')
            .parents('.oxd-input-group')
            .find('input')
            .clear()
            .type(manager)

        cy.get('.oxd-autocomplete-dropdown')
            .should('be.visible')

        cy.contains('.oxd-autocomplete-option', manager)
            .click()

    }

    inputNumberPosition(number) {
        cy.contains('label', 'Number of Positions')
            .parents('.oxd-input-group')
            .find('input')
            .clear()
            .type(number)
    }

    clickActiveSwitch() {
        cy.get('.oxd-switch-input')
            .first()
            .click({
                force: true
            })
    }

    clickPublishSwitch() {
        cy.get('.oxd-switch-input')
            .last()
            .click({
                force: true
            })
    }

    searchVacancy(vacancyName) {

        cy.get('.oxd-select-text')
            .eq(1)
            .click()

        cy.contains('.oxd-select-option', vacancyName)
            .click()

    }

    clickEditVacancy(vacancyName) {

        cy.contains('.oxd-table-body .oxd-table-row', vacancyName, {
            timeout: 15000
        })
        .within(() => {

            cy.get('i.bi-pencil-fill')
                .click()

        })

    }

    clickDeleteVacancy(vacancyName) {

        cy.contains('.oxd-table-body .oxd-table-row', vacancyName, {
            timeout: 15000
        })
        .within(() => {

            cy.get('i.bi-trash')
                .click()

        })

    }

    // ==========================
    // Verification
    // ==========================

    verifySuccessToast() {
        cy.get('.oxd-toast')
            .should('be.visible')
            .and('contain.text', 'Success')
    }

    verifyRecordFound() {
        cy.contains('Found')
            .should('be.visible')
    }

    verifyNoRecordFound() {
        cy.contains('No Records Found')
            .should('be.visible')
    }

}

module.exports = new RecruitmentPage()