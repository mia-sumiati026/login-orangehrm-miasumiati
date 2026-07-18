class DirectoryPage {

    verifyDirectoryPage() {

        cy.url()
            .should('include', '/directory/viewDirectory')

    }

    inputEmployeeName(employee) {

        cy.get('input[placeholder="Type for hints..."]')
            .clear()
            .type(employee)

    }

    clickJobTitle() {

        cy.get('.oxd-select-text')
            .eq(0)
            .click()

    }

    selectJobTitle(jobTitle) {

        cy.contains('.oxd-select-option', jobTitle)
            .click()

    }

    selectFirstJobTitle() {

        cy.get('.oxd-select-option')
            .first()
            .click()

    }

    selectFirstLocation() {

        cy.get('.oxd-select-option')
            .first()
            .click()

    }


    clickLocation() {

        cy.get('.oxd-select-text')
            .eq(1)
            .click()

    }

    selectLocation(location) {

        cy.contains('.oxd-select-option', location)
            .click()

    }

    clickSearch() {

        cy.contains('button', 'Search')
            .click()

    }

    clickReset() {

        cy.contains('button', 'Reset')
            .click()

    }

    verifyDirectoryLoaded() {

        cy.contains('Records Found')
            .should('be.visible')

    }

    verifyResetFilter() {

        cy.get('input[placeholder="Type for hints..."]')
            .should('have.value', '')

        cy.get('.oxd-select-text-input')
            .eq(0)
            .should('contain', '-- Select --')

        cy.get('.oxd-select-text-input')
            .eq(1)
            .should('contain', '-- Select --')

    }

}

module.exports = new DirectoryPage()