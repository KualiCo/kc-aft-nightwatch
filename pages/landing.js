const authCommands = {
    authenticate(username) {
        const page = this
        const browser = this.api

        page
            .waitForElementVisible('@submit', 1000)
            .setValue('@username', username)
            .setValue('@password', 'password')
            .click('@submit')
            .waitForElementVisible('h1[id=Kc-LandingPage-DefaultView_header]', 2500)

        return this
    }   
}

const navigation = {
    toNewAward() {
        let page = this
        let client = this.api

        page
            .click('@unitDropdown')
            .click('@newAward')

        client
            .waitForElementVisible('iframe[id=u1t30nlw]', 10000)
            .assert.elementPresent('iframe[id=u1t30nlw]')

        return client.page.award.new()
    }
}

module.exports = {
    commands: [authCommands, navigation],

    elements: {
        username: 'input[data-test="username"]',
        password: 'input[data-test="password"]',
        submit: 'button[data-test="login"]',
        unitDropdown: '.kc-unitDropdown a',
        newAward: 'a[id=utv5bte]'
    },

    url () {
        return `${this.api.globals.baseUrl}`
    }
}
