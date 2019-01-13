<template>
    <div class="file-drag-drop">
        <div class="fileForm">
            <input hidden type="file" name="files[]" :id="'file'+name" @change="onFileChange" multiple/>
            <label :for="'file'+name" class="upload-label">
                <!--<span v-if="resetForm==true "><strong class="choose-file">Choose a file</strong></span>-->
                <span v-if="filePaths.length==0 "><strong class="choose-file">Choose a file</strong></span>
                <span v-else>
                    <ul>
                        <!--<li v-for="(path, index) in uploadedFilePath[name]">[{{path}}]</li>-->
                        <li v-for="(path, index) in filePaths">[{{path}}]</li>
                    </ul>
                </span>
            </label>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import appConfig from '@/app.config.js'

    const API_BASE = appConfig.API_BASE
    import {mapState} from 'vuex'

    export default {
        props: {
            name: {type: String, required: true},
            filenames: {type:String}
        },
        data(){
            return {
                files: [],
                filePaths: []
            }
        },
        computed: {
            ...mapState(['submitted'])
        },
        watch: {
            'submitted': function () {
                // console.log('submitted?', this.submitted)
                if (this.submitted)
                    this.filePaths = []
            }
        },
        created(){
            // this.$store.state.uploadedFilePath[this.name]=[]
            if (this.filenames!=null) {
                this.filePaths = this.filenames.split(',')
            } else
                this.filePaths =[]
        },

        methods: {
            onFileChange(e){
                this.$store.state.submitted=false
                let uploadfiles = e.target.files || e.dataTransfer.files;
                if (!uploadfiles.length) return;
                // this.files=files[0];

                for( let i = 0; i < uploadfiles.length; i++ ){
                    this.files.push( uploadfiles[i] );
                }

                let formData = new FormData()
                // formData.append('files', this.files)
                for( let i = 0; i < this.files.length; i++ ){
                    let file = this.files[i];

                    formData.append('files[' + i + ']', file);
                }

                axios.post(API_BASE + '/form/123465/upload', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    })
                    .then((data)=>{
                        console.log('SUCCESS!!', data.data)
                        this.filePaths = data.data.filenames
                        this.files = []
                        this.$store.state.formdata[this.name]=data.data.filenames.join(',')
                        // console.log('hey', this.$store.state.formdata)
                    })
                    .catch(function(){
                        console.log('FAILURE!!', this.name)
                    });
            },
        }
    }
</script>

<style>
    .file-drag-drop {
        width: 100%;
        margin-bottom: 20px;
    }
    .fileForm{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 4px dotted dodgerblue;
        height: 120px;
        width: 200px;
        background: #ccc;
        /*margin: auto;*/
        margin: 20px;
        text-align: center;
        /*line-height: 120px;*/
        border-radius: 5px;
        font-size: 15px;
    }

    .fileForm ul {
        list-style: none;
        padding: 0px;
    }

    div.file-listing{
        width: 400px;
        margin: auto;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: center;
    }

    div.file-listing img{
        height: 100px;
    }

    div.remove-container{
        text-align: center;
        margin-right: auto;
        margin-left: auto;
    }

    div.remove-container v-btn{
        color: red;
        cursor: pointer;
    }

    a.submit-button{
        display: block;
        margin: auto;
        text-align: center;
        width: 200px;
        padding: 10px;
        text-transform: uppercase;
        background-color: #CCC;
        color: white;
        font-weight: bold;
        margin-top: 20px;
    }

    progress{
        width: 400px;
        margin: auto;
        display: block !important;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .img-container {
        margin: auto;
        text-align: center;
    }

    .upload-label:hover .choose-file {
        color: #39bfd3;
    }
</style>
