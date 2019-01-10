import axios from 'axios'
import appConfig from '@/app.config.js'

const API_BASE = appConfig.API_BASE

export default {
    loadUserData (context, payload) {
        axios.get(API_BASE + '/getUserData').then(({ data }) => {
            if (data.success) {
                context.commit('setUserData', data)
            }
        })
    },
    loadViewingProfile (context, payload) {
        axios.get(API_BASE + '/getProfile?user_id=' + payload.user_id).then(({ data }) => {
            if (data.success) {
                context.commit('setViewingProfile', data)
            }
        })
    },
    loadFormDefinition(context, payload) {
        axios.get(API_BASE + '/form/123465/getFormDefinition').then(({ data }) => {
            if (data.success) {
                // console.log('submitdefine',data.form)
                context.commit('setFormDefinition', data.form)
                context.commit('setFormData', data.form)
            }
        })
    },
    loadAppDefinition(context, payload) {
        axios.get(API_BASE + '/app/123456/getAppDefinition').then(({ data }) => {
            if (data.success) {
                context.commit('setAppDefinition', data.app)
            }
        })
    },
    loadSubmittedItems(context, payload) {
        axios.get(API_BASE + '/form/123465/list').then(({ data }) => {
            if (data.success) {
                context.commit('setSubmittedItems', data.items)
            }
        })
    },
    submitNewItem(context, payload) {
        axios.post(API_BASE + '/form/123465/submit', payload)
            .then(({ data }) => {
            if (data.success) {
                context.commit('addSubmittedItems', data.data)
            }
        })
    },
    uploadFile(context, payload) {
        axios.post(API_BASE + '/form/123465/upload', payload.formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function( progressEvent ) {
                    let percentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) )
                    context.commit('setUploadPercentage', percentage)
                }.bind(this)
            })
            .then((data)=>{
                console.log('SUCCESS!!', data.data)
                context.commit('setPhotoUrl', {url:data.data.filenames[0], formName:payload.formName})
            })
            .catch(function(){
                console.log('FAILURE!!')
            });
    }
}
