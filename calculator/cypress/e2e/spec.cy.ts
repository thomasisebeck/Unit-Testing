describe('end to end test', () => {
  beforeEach(() => {
    cy.visit('localhost:5173')
  })

  // it('check that all elements needed for testing are displaying', () => {
  //   //function buttons
  //   cy.get('div:contains("remember")').should('exist');
  //   cy.get('div:contains("recall")').should('exist');
  //   cy.get('div:contains("clear")').should('exist');
  //   cy.get('div:contains("=")').should('exist');
  //   cy.get('div:contains("+")').should('exist');
  //   cy.get('div:contains("-")').should('exist');
  //   cy.get('div:contains("x")').should('exist');
  //   cy.get('div:contains("/")').should('exist');
  //
  //   //backspace
  //   cy.get('img').should('exist');
  //
  //   //screens
  //   cy.get('#lastComputationDisplay').should('exist')
  //   cy.get('#display').should('exist')
  //
  //   //other buttons
  //   cy.get('div:contains("A")').should('exist');
  //   cy.get('div:contains("B")').should('exist');
  //   cy.get('div:contains("C")').should('exist');
  //   cy.get('div:contains("D")').should('exist');
  //   cy.get('div:contains("E")').should('exist');
  //   cy.get('div:contains("F")').should('exist');
  //   cy.get('div:contains("1")').should('exist');
  //   cy.get('div:contains("2")').should('exist');
  //   cy.get('div:contains("3")').should('exist');
  //   cy.get('div:contains("4")').should('exist');
  //   cy.get('div:contains("5")').should('exist');
  //   cy.get('div:contains("6")').should('exist');
  //   cy.get('div:contains("7")').should('exist');
  //   cy.get('div:contains("8")').should('exist');
  //   cy.get('div:contains("9")').should('exist');
  //   cy.get('div:contains("0")').should('exist');
  // })
  //
  // it('test that inputs can be made and deleted', () => {
  //   cy.get('div:contains("A")').click({multiple: true});
  //   cy.get('div:contains("F")').click({multiple: true});
  //   cy.get('div:contains("5")').click({multiple: true});
  //   cy.get('div:contains("3")').click({multiple: true});
  //
  //   cy.get('#display').contains('AF53')
  //
  //   cy.get('img').should('exist');
  //   cy.get('img').click({multiple: true});
  //   cy.get('#display').contains('AF5')
  //
  //
  //   cy.get('img').click({multiple: true});
  //   cy.get('#display').contains('AF')
  //
  //   cy.get('img').click({multiple: true});
  //   cy.get('#display').contains('A')
  //
  //   cy.get('img').click({multiple: true});
  // })

  it('remember button only becomes available after calculation',{
    defaultCommandTimeout: 10000
  },  () => {
    cy.get('*[class^="_disabled"]').should('exist');

    cy.get('div:contains("A")').click({multiple: true});
    cy.get('div:contains("+")').click({multiple: true});
    cy.get('div:contains("B")').click({multiple: true});
    cy.get('div:contains("=")').click({multiple: true});
    cy.get('div:contains("remember")').click({multiple: true});
    cy.get('div:contains("recall")').click({multiple: true});
    cy.get('div:contains("recall")').click({multiple: true});

    //no history to recall
    cy.get('#display').should('be.empty')
  })

  it('perform a calculation', ()=> {
    cy.get('div:contains("A")').click({multiple: true});
    cy.get('div:contains("F")').click({multiple: true});
    cy.get('div:contains("5")').click({multiple: true});
    cy.get('div:contains("3")').click({multiple: true});

    cy.get('div:contains("+")').click({multiple: true});

    cy.get('div:contains("C")').click({multiple: true});
    cy.get('div:contains("D")').click({multiple: true});
    cy.get('div:contains("A")').click({multiple: true});
    cy.get('div:contains("6")').click({multiple: true});

    cy.get('div:contains("=")').click({multiple: true});

    cy.get('#display').contains('17CF9')
    cy.get('#lastComputationDisplay').contains('AF53 + CDA6 =')
  })

  it('remember, clear and recall', {
    defaultCommandTimeout: 2000
  }, ()=> {
    cy.get('div:contains("A")').click({multiple: true});
    cy.get('div:contains("+")').click({multiple: true});
    cy.get('div:contains("B")').click({multiple: true});
    cy.get('div:contains("=")').click({multiple: true});

    cy.get('div:contains("remember")').click({multiple: true});
    cy.get('div:contains("clear")').click({multiple: true});

    cy.get('div:contains("C")').click({multiple: true});
    cy.get('div:contains("+")').click({multiple: true});
    cy.get('div:contains("D")').click({multiple: true});
    cy.get('div:contains("=")').click({multiple: true});

    cy.get('div:contains("remember")').click({multiple: true});
    cy.get('div:contains("clear")').click({multiple: true});

    cy.get('div:contains("recall")').click({multiple: true});
    cy.get('#display').contains('19')
    cy.get('div:contains("recall")').click({multiple: true});
    cy.get('#display').contains('15')

  })

})