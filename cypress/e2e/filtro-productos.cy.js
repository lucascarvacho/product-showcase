describe('Filtro de productos por categoría', () => {
  beforeEach(() => {
    // Requiere que la API mock (npm run api) y la app (npm run serve) estén corriendo
    cy.visit('/catalogo')
  })

  it('muestra todos los productos al inicio', () => {
    cy.get('.v-card').should('have.length', 2)
  })

  it('el usuario filtra por categoría y ve solo los resultados de esa categoría', () => {
    cy.get('.category-filter').click()
    cy.get('.v-list-item-title').contains('Periféricos').click()

    cy.get('.v-card').should('have.length', 1)
    cy.get('.v-card').should('contain.text', 'Ultimate')
  })

  it('vuelve a mostrar todos los productos al elegir "Todas"', () => {
    cy.get('.category-filter').click()
    cy.get('.v-list-item-title').contains('Periféricos').click()

    cy.get('.category-filter').click()
    cy.get('.v-list-item-title').contains('Todas').click()

    cy.get('.v-card').should('have.length', 2)
  })
})
