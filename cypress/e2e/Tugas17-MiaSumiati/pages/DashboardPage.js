class DashboardPage {

    verifyDashboard() {

        cy.url()
            .should('include', '/dashboard')

        cy.contains('Dashboard')
            .should('be.visible')

    }

}

module.exports = new DashboardPage()