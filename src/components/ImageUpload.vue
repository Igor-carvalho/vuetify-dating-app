<template>
    <div class="file-drag-drop">
        <!--<div class="" :ref="'imageform'+name">-->
            <input hidden type="file" name="files[]" :id="'imageupload'+name" @change="onImageChange" multiple />
            <label :for="'imageupload'+name" class="upload-label fileForm" >

                <div v-if="uploadPercentage==0">
                <span v-if="filePaths.length==0"><strong class="choose-file">Choose an Image file</strong></span>
                <span v-else>
                    <ul :ref="'imagelist'+name">
                        <li v-for="(path, index) in filePaths">[{{path}}]</li>
                    </ul>
                </span>
                </div>
                <v-progress-circular v-else
                                     :rotate="-90"
                                     :size="50"
                                     :width="5"
                                     :value="uploadPercentage"
                                     color="teal"
                                     class="progressBar"
                >
                    {{ uploadPercentage }}
                </v-progress-circular>
            </label>
        <!--</div>-->
        <!--<img hidden @click="openImage()" class="preview" v-bind:ref="'preview'"/>-->

    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    import axios from 'axios'
    import appConfig from '@/app.config.js'

    const API_BASE = appConfig.API_BASE

    export default {
        /*
          Variables used by the drag and drop component
        */
        props: {
            name: {type: String, required: true},
            filenames: {type:String}
        },
        data(){
            return {
                dragAndDropCapable: false,
                files: [],
                filePaths: [],
                uploadPercentage: 0
            }
        },
        computed: {
            ...mapState(['submitted'])
        },
        watch: {
            'submitted': function () {
                if (this.submitted)
                    this.filePaths = []
            }
        },

        created(){
            if (this.filenames!=null) {
                this.filePaths = this.filenames.split(',')
            } else
                this.filePaths =[]

            /*
              Determine if drag and drop functionality is capable in the browser
            */
            // this.dragAndDropCapable = this.determineDragAndDropCapable();
            //
            // /*
            //   If drag and drop capable, then we continue to bind events to our elements.
            // */
            // if( this.dragAndDropCapable ){
            //     /*
            //       Listen to all of the drag events and bind an event listener to each
            //       for the imageform.
            //     */
            //     ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
            //         /*
            //           For each event add an event listener that prevents the default action
            //           (opening the file in the browser) and stop the propagation of the event (so
            //           no other elements open the file in the browser)
            //         */
            //         this.$refs.imageform.addEventListener(evt, function(e){
            //             e.preventDefault();
            //             e.stopPropagation();
            //         }.bind(this), false);
            //     }.bind(this));
            //
            //     /*
            //       Add an event listener for drop to the form
            //     */
            //     this.$refs.imageform.addEventListener('drop', function(e){
            //         /*
            //           Capture the files from the drop event and add them to our local files
            //           array.
            //         */
            //         // for( let i = 0; i < e.dataTransfer.files.length; i++ ){
            //         //     this.files.push( e.dataTransfer.files[i] );
            //         //     this.getImagePreviews();
            //         // }
            //         this.files = e.dataTransfer.files[0]
            //
            //         this.getImagePreviews();
            //     }.bind(this));
            // }
        },

        methods: {
            ...mapActions(['uploadImage']),
            ...mapMutations(['uploadImage']),
            onImageChange: function(e) {
                // if (this.$refs['imagelist'+this.name] != undefined) {
                //     this.$refs['imagelist'+this.name].innerHTML =''
                // }

                let uploadfiles = e.target.files || e.dataTransfer.files;
                if (!uploadfiles.length) return;
                // this.files=files[0];
                // this.getImagePreviews();

                // console.log(e)
                for( let i = 0; i < uploadfiles.length; i++ ){
                    this.files.push( uploadfiles[i] );
                    // this.getImagePreviews();
                }

                let formData = new FormData()
                // formData.append('files', this.files)
                for( let i = 0; i < this.files.length; i++ ){
                    let file = this.files[i];

                    formData.append('files[' + i + ']', file);
                }
                // this.uploadImage({formData:formData, formName:this.name})
                axios.post(API_BASE + '/form/'+this.$route.params.id+'/upload', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: function (progressEvent) {
                            // console.log('progressEvent',progressEvent.loaded, progressEvent.total, this.uploadPercentage, this.filePaths)
                            if (progressEvent.loaded == progressEvent.total)
                                this.uploadPercentage = 0
                            else
                                this.uploadPercentage = Math.round(progressEvent.loaded / progressEvent.total * 100).toFixed(0);

                        }.bind(this)
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
            /*
              Determines if the drag and drop functionality is in the
              window
            */
            // determineDragAndDropCapable(){
            //     /*
            //       Create a test element to see if certain events
            //       are present that let us do drag and drop.
            //     */
            //     var div = document.createElement('div');
            //
            //     /*
            //       Check to see if the `draggable` event is in the element
            //       or the `ondragstart` and `ondrop` events are in the element. If
            //       they are, then we have what we need for dragging and dropping files.
            //
            //       We also check to see if the window has `FormData` and `FileReader` objects
            //       present so we can do our AJAX uploading
            //     */
            //     return ( ( 'draggable' in div )
            //         || ( 'ondragstart' in div && 'ondrop' in div ) )
            //         && 'FormData' in window
            //         && 'FileReader' in window;
            // },

            /*
              Gets the image preview for the file.
            */
            // getImagePreviews(){
            //     /*
            //       Iterate over all of the files and generate an image preview for each one.
            //     */
            //     // for( let i = 0; i < this.files.length; i++ ){
            //         /*
            //           Ensure the file is an image file
            //         */
            //         if ( /\.(jpe?g|png|gif)$/i.test( this.files.name ) ) {
            //             /*
            //               Create a new FileReader object
            //             */
            //             let reader = new FileReader();
            //
            //             /*
            //               Add an event listener for when the file has been loaded
            //               to update the src on the file preview.
            //             */
            //             reader.addEventListener("load", function(){
            //                 this.$refs['preview'].src = reader.result;
            //             }.bind(this), false);
            //
            //             /*
            //               Read the data for the file in through the reader. When it has
            //               been loaded, we listen to the event propagated and set the image
            //               src to what was loaded from the reader.
            //             */
            //             reader.readAsDataURL( this.files );
            //         }else{
            //             /*
            //               We do the next tick so the reference is bound and we can access it.
            //             */
            //             this.$nextTick(function(){
            //                 this.$refs['preview'].src = '/images/file.png';
            //             });
            //         }
            //     // }
            // },

            /*
              Submits the files to the server
            */
            // submitFiles(){
            //     /*
            //       Initialize the form data
            //     */
            //     let formData = new FormData()
            //     formData.append('files', this.files)
            //     // /*
            //     //   Iteate over any file sent over appending the files
            //     //   to the form data.
            //     // */
            //     // for( var i = 0; i < this.files.length; i++ ){
            //     //     let file = this.files[i];
            //     //
            //     //     formData.append('files[' + i + ']', file);
            //     // }
            //
            //     /*
            //       Make the request to the POST /file-drag-drop URL
            //     */
            //     // this.uploadFile({formData:formData, formName:this.name})
            //     axios.post(API_BASE + '/form/123465/upload', formData,
            //         {
            //             headers: {
            //                 'Content-Type': 'multipart/form-data'
            //             },
            //         })
            //         .then((data)=>{
            //             console.log('SUCCESS!!', data.data)
            //             this.filePaths = data.data.filenames
            //             this.files = []
            //             this.$store.state.formdata[this.name]=data.data.filenames.join(',')
            //             // console.log('hey', this.$store.state.formdata)
            //         })
            //         .catch(function(){
            //             console.log('FAILURE!!', this.name)
            //         });
            // },

            /*
              Removes a select file the user has uploaded
            */
            // removeFile(  ){
            //     this.files='';
            //
            // },

            // openImage() {
            //     let image = new Image();
            //     image.src = this.$refs['preview'].src
            //     image.width = 300
            //     image.height = 300
            //
            //     let w = window.open("");
            //     w.document.write(image.outerHTML);
            // }
        }
    }
</script>

<style>
    .file-drag-drop {
        width: 100%;
        margin-bottom: 10px;
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
        margin: 10px 0px;
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
        width: 300px;
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

    .img-container {
        margin: auto;
        text-align: center;
    }

</style>
