import Vue from 'vue'
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
        if(state.formdata ==null) {
            for (let field of data.fields) {
                state.formdata[field.name] = null
            }
            for (let index in data.tabs) {
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

    setImageUrl (state, data) {
        // state.submitteditems.push(data)
        let urls = []
        for (let url of data.url) {
            urls.push('['+url+']')
        }
        state.formdata[data.formName] = urls.join(',')
        state.uploadedImagePath = data.url
        // console.log('submittedFormdata', state.formdata, state.uploadedImagePath)
    },

    saveDraft (state, data) {
        // state.draftitems.push(data)
        if (data.draftID == '') {
            if (state.draftitems[data.listID] == undefined) {
                let newKey = data.listID + 0
                Vue.set(state.draftitems, data.listID, {[newKey]: data.draftData})
            } else {
                let newKey = data.listID + Object.keys(state.draftitems[data.listID]).length
                Vue.set(state.draftitems[data.listID], newKey, data.draftData)
            }
        } else {
            if (state.draftitems[data.listID] == undefined) {
                Vue.set(state.draftitems, data.listID, {[data.draftID]: data.draftData})
            } else
                state.draftitems[data.listID][data.draftID] = data.draftData
        }

        console.log('draftItems', state.draftitems[data.listID])
    },

    resetFormData(state, data) {
        for (let indexKey of Object.keys(state.formdata)){
            state.formdata[indexKey] = null
        }
    },

    changeSubmittedState(state, data) {

        state.submitted = true
    }
}
