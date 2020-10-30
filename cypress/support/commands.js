// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login"]').click()
})

Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe, callback = () => { }) => {
  return cy
    .wrap($iframe)
    .should(iframe => expect(iframe.contents().find('body')).to.exist)
    .then(iframe => cy.wrap(iframe.contents().find('body')))
    .within({}, callback)
})

Cypress.Commands.add('addSubAwardContact', (rolodexId, contactTypeCode) => {
  cy.get('main iframe.uif-iFrame').iframe(() => {
    cy.get('#tab-Closeout-div').should('exist')
    cy.get('#newSubAwardContact\\.rolodex\\.rolodexId').should('be.empty')

    cy.get('#newSubAwardContact\\.rolodex\\.rolodexId').type(rolodexId)
    cy.get('#newSubAwardContact\\.contactTypeCode').select(contactTypeCode)
    cy.get('#subAward-contacts-table input.addButton').click()

    cy.awaitProcessing()
  })
})

Cypress.Commands.add('awaitProcessing', () => {
  cy.contains('Page is being processed by the server....').should('not.exist')
})

Cypress.Commands.add('saveToS3', (sourcePath, destinationPath) =>
  cy.task('saveToS3', { sourcePath, destinationPath })
)

Cypress.Commands.add('getFromS3', (sourcePath, destinationPath) => {
  cy.task('getFromS3', { sourcePath, destinationPath })
})

Cypress.Commands.add('deleteFromS3', path => {
  cy.task('deleteFromS3', path)
})

Cypress.Commands.add('fileExists', path => {
  cy.task('fileExists', path)
})

Cypress.Commands.add('deleteFile', (path, failOnNotExists) => {
  cy.task('deleteFile', path, failOnNotExists)
})

Cypress.Commands.add('flattenPdf', (sourcePath, destinationPath) =>
  cy.task('flattenPdf', { sourcePath, destinationPath })
)

Cypress.Commands.add('convertPdfToImages', (sourcePdf, destinationPath, destinationFilenamePrefix) =>
  cy.task('convertPdfToImages', { sourcePdf, destinationPath, destinationFilenamePrefix })
)

Cypress.Commands.add('imagesMatch', (image1, image2) =>
  cy.task('imagesMatch', { image1, image2 })
)