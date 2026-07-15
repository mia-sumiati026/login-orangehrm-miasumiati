describe('Platzi API Automation - Cypress', () => {

    const baseUrl = 'https://api.escuelajs.co/api/v1'

    it('TC-API-001 GET All Products', () => {
        cy.request('GET', `${baseUrl}/products`).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
                expect(response.body.length).to.be.greaterThan(0)
            })
    })

    it('TC-API-002 POST New Category', () => {
        cy.request({
            method: 'POST', url: `${baseUrl}/categories/`,
            body: {
                "name": "Category Baru Mia Sumiati",
                "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=867"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('name', 'Category Baru Mia Sumiati')
            expect(response.body).to.have.property('image')
        })
    })

    it('TC-API-003 PUT Category ID', () => {
        cy.request({
            method: 'PUT', url: `${baseUrl}/categories/3`,
            body: {
                "name": "Kategori Pilihan Mia",
                "image": "https://placeimg.com/640/480/tech"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name', 'Kategori Pilihan Mia')
            expect(response.body).to.have.property('image')
        })
    })

    it('TC-API-004 GET All Categories', () => {
        cy.request('GET', `${baseUrl}/categories`)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
            })
    })

    it('TC-API-005 GET User By ID', () => {
        cy.request('GET', `${baseUrl}/users/1`)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.id).to.eq(1)
                expect(response.body.email).to.exist
            })
    })

    it('TC-API-006 POST New Product', () => {
        cy.request('POST', `${baseUrl}/products`, {
            title: 'New Cypress Product Mia',
            price: 500,
            description: 'Automation Testing',
            categoryId: 1,
            images: ['https://placehold.co/600x400']
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.title).to.eq('New Cypress Product Mia')
            expect(response.body.price).to.eq(500)
        })
    })


    it('TC-API-007 PUT Product Invalid ID', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/products/999999`,
            failOnStatusCode: false,
            body: {
                title: 'Updated Product3',
                price: 700,
                description: 'Updated Description',
                categoryId: 1,
                images: ['https://placehold.co/600x400']
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.exist
        })
    })

    it('TC-API-008 PATCH Product Invalid Body', () => {
        cy.request({
            method: 'PATCH',
            url: `${baseUrl}/products/4`,
            failOnStatusCode: false,
            body: {
                price: 'abc'
            }
        }).then((response) => {
            expect(response.status).to.be.oneOf([400, 404])
            expect(response.body.message).to.exist
        })
    })

    it('TC-API-009 DELETE Product', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/products/2`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.oneOf([200, 400, 404])
            expect(response.body.message).to.exist
        })
    })

    it('TC-API-010 GET Products With Limit', () => {
        cy.request('GET', `${baseUrl}/products?offset=0&limit=5`)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.length).to.eq(5)
            })
    })

    it('TC-API-011 GET Invalid ID Product', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/products/999999`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.exist
        })
    })

    it('TC-API-012 POST Product Invalid Body', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/products`,
            failOnStatusCode: false,
            body: {title: ''}
        }).then((response) => {
            expect(response.status).to.be.oneOf([400, 500])
            expect(response.body.message).to.exist
        })
    })

    it('TC-API-013 GET Category Invalid ID', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/categories/999999`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.exist
        })
    })

    it('TC-API-014 PATCH Product Invalid ID', () => {
        cy.request({
            method: 'PATCH',url: `${baseUrl}/products/999999`,failOnStatusCode: false,
            body: {price: 900}
        }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body.message).to.exist
        })
    })
})