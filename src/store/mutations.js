export default {
    setUserData (state, data) {
        state.connections = data.connections
        state.profile = {
            info: data.profile,
            expectation: data.expectation,
            photos: data.photos
        }
        state.activeTab = 0
    },
    clearUserData: (state) => {
        state.token = ''
        state.connections = {}
        state.profile = {
            info: {},
            expectation: {},
            photos: {}
        }
        state.activeTab = 0
    },
    setViewingProfile (state, data) {
        state.viewing.profile = {
            info: data.profile,
            expectation: data.expectation,
            photos: data.photos
        }
        state.viewing.mode = data.mode
    },
    setActiveTab (state, index) {
        state.activeTab = index
    },
    setToken: (state, token) => {
        state.token = token
    },
    setFormDefinition (state, data) {
        state.formdefinition = data
        state.activeTab = 0
    },
    setFormData(state, data) {
        state.formdefinition = data
        for (let field of data.fields ) {
            state.formdata[field.name] = null
        }
        for (let index in data.tabs ) {
            for (let tabfield of data.tabs[index].fields) {
                if (tabfield.name != undefined) {
                        state.formdata[tabfield.name] = null
                } else {
                    for (let subindex in tabfield) {
                        let subtab = tabfield[subindex]
                        if (subtab.name != undefined) {
                            state.formdata[subtab.name] = null
                        }
                    }
                }
            }
        }
    },
    setAppDefinition (state, data) {
        state.appdefinition = data
    },
    setSubmittedItems (state, data) {
        state.submitteditems = data
    },
    addSubmittedItems (state, data) {
        // state.submitteditems.push(data)
        state.submittednewitems = {...state.submittednewitems, data}
    },
    setFileUrl (state, data) {
        // state.submitteditems.push(data)
        state.formdata[data.formName] = data.url
        state.uploadedFilePath = data.url
        // console.log('submittedFormdata', state.formdata)
    },

    setImageUrl (state, data) {
        // state.submitteditems.push(data)
        state.formdata[data.formName] = data.url
        state.uploadedImagePath = data.url
        // console.log('submittedFormdata', state.formdata)
    },
}
