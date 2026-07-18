class DashboardPage {

    verifyDashboard() {

        cy.url()
            .should('include', '/dashboard')

        cy.contains('Dashboard')
            .should('be.visible')

    }

    clickDirectory() {

        cy.contains('span', 'Directory')
            .click()

    }

    clickRecruitment() {

        cy.contains('span', 'Recruitment')
            .click()

    }

}

module.exports = new DashboardPage()