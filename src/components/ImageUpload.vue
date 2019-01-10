<template>
    <div class="file-drag-drop">
        <div class="fileForm" ref="imageform">
            <input hidden type="file" name="files[]" id="imageupload" @change="onImageChange"/>
            <label for="imageupload" class="upload-label">
                <span v-if="uploadedImagePath==''"><strong class="choose-file">Choose an Image file</strong></span>
                <span v-else @click="openImage()">[{{ uploadedImagePath }}]</span>
                <!--<span> or drag it here</span>-->
                </label>
            <!--<span class="drop-files">Drop the files here!</span>-->
        </div>
        <img hidden @click="openImage()" class="preview" v-bind:ref="'preview'"/>

    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'

    export default {
        /*
          Variables used by the drag and drop component
        */
        props: {
            name: {type: String, required: true}
        },
        data(){
            return {
                dragAndDropCapable: false,
                files: '',
            }
        },

        mounted(){
            this.$store.state.uploadedImagePath = ''
            console.log('imagepath',this.uploadedImagePath)
            // this.uploadedImagePath = ''

            /*
              Determine if drag and drop functionality is capable in the browser
            */
            this.dragAndDropCapable = this.determineDragAndDropCapable();

            /*
              If drag and drop capable, then we continue to bind events to our elements.
            */
            if( this.dragAndDropCapable ){
                /*
                  Listen to all of the drag events and bind an event listener to each
                  for the imageform.
                */
                ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
                    /*
                      For each event add an event listener that prevents the default action
                      (opening the file in the browser) and stop the propagation of the event (so
                      no other elements open the file in the browser)
                    */
                    this.$refs.imageform.addEventListener(evt, function(e){
                        e.preventDefault();
                        e.stopPropagation();
                    }.bind(this), false);
                }.bind(this));

                /*
                  Add an event listener for drop to the form
                */
                this.$refs.imageform.addEventListener('drop', function(e){
                    /*
                      Capture the files from the drop event and add them to our local files
                      array.
                    */
                    // for( let i = 0; i < e.dataTransfer.files.length; i++ ){
                    //     this.files.push( e.dataTransfer.files[i] );
                    //     this.getImagePreviews();
                    // }
                    this.files = e.dataTransfer.files[0]

                    this.getImagePreviews();
                }.bind(this));
            }
        },
        computed:{
            ...mapState(['uploadedImagePath']),
        },

        methods: {
            ...mapActions(['uploadImage']),
            onImageChange(e){
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.files=files[0];
                this.getImagePreviews();

                // console.log(e)
                // for( let i = 0; i < e.dataTransfer.files.length; i++ ){
                //     this.files.push( e.dataTransfer.files[i] );
                //     this.getImagePreviews();
                // }

                let formData = new FormData()
                formData.append('files', this.files)
                this.uploadImage({formData:formData, formName:this.name})
            },
            /*
              Determines if the drag and drop functionality is in the
              window
            */
            determineDragAndDropCapable(){
                /*
                  Create a test element to see if certain events
                  are present that let us do drag and drop.
                */
                var div = document.createElement('div');

                /*
                  Check to see if the `draggable` event is in the element
                  or the `ondragstart` and `ondrop` events are in the element. If
                  they are, then we have what we need for dragging and dropping files.

                  We also check to see if the window has `FormData` and `FileReader` objects
                  present so we can do our AJAX uploading
                */
                return ( ( 'draggable' in div )
                    || ( 'ondragstart' in div && 'ondrop' in div ) )
                    && 'FormData' in window
                    && 'FileReader' in window;
            },

            /*
              Gets the image preview for the file.
            */
            getImagePreviews(){
                /*
                  Iterate over all of the files and generate an image preview for each one.
                */
                // for( let i = 0; i < this.files.length; i++ ){
                    /*
                      Ensure the file is an image file
                    */
                    if ( /\.(jpe?g|png|gif)$/i.test( this.files.name ) ) {
                        /*
                          Create a new FileReader object
                        */
                        let reader = new FileReader();

                        /*
                          Add an event listener for when the file has been loaded
                          to update the src on the file preview.
                        */
                        reader.addEventListener("load", function(){
                            this.$refs['preview'].src = reader.result;
                        }.bind(this), false);

                        /*
                          Read the data for the file in through the reader. When it has
                          been loaded, we listen to the event propagated and set the image
                          src to what was loaded from the reader.
                        */
                        reader.readAsDataURL( this.files );
                    }else{
                        /*
                          We do the next tick so the reference is bound and we can access it.
                        */
                        this.$nextTick(function(){
                            this.$refs['preview'].src = '/images/file.png';
                        });
                    }
                // }
            },

            /*
              Submits the files to the server
            */
            submitFiles(){
                /*
                  Initialize the form data
                */
                let formData = new FormData()
                formData.append('files', this.files)
                // /*
                //   Iteate over any file sent over appending the files
                //   to the form data.
                // */
                // for( var i = 0; i < this.files.length; i++ ){
                //     let file = this.files[i];
                //
                //     formData.append('files[' + i + ']', file);
                // }

                /*
                  Make the request to the POST /file-drag-drop URL
                */
                this.uploadFile({formData:formData, formName:this.name})
            },

            /*
              Removes a select file the user has uploaded
            */
            removeFile(  ){
                this.files='';

            },

            openImage() {
                let image = new Image();
                image.src = this.$refs['preview'].src
                image.width = 300
                image.height = 300

                let w = window.open("");
                w.document.write(image.outerHTML);
            }
        }
    }
</script>

<style>
    .file-drag-drop {
        width: 100%;
        margin-bottom: 20px;
    }
    .fileForm{
        border: 4px dotted dodgerblue;
        display: block;
        height: 120px;
        width: 200px;
        background: #ccc;
        /*margin: auto;*/
        margin: 20px;
        text-align: center;
        line-height: 120px;
        border-radius: 5px;
        font-size: 15px;
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

    .upload-label:hover .choose-file {
        color: #39bfd3;
    }
</style>
