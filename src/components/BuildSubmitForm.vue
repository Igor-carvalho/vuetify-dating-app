<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-title class="text-xs-center">
                        <v-flex xs12 sm12 md12>
                            <span v-if="forminfo.title" class="headline">{{forminfo.title}}</span>
                            <br>
                            <span v-if="forminfo.intro" class="subheading">{{forminfo.intro}}</span>
                        </v-flex>
                    </v-card-title>
                    <v-card-text>
                        <v-container class="mt-0 pt-0">
                            <v-layout>
                                <div v-if="forminfo.fields" style="width: 100%">
                                    <form class="" @submit.prevent="submitNewForm" ref="submitform">
                                        <div v-for="(item, index) in forminfo.fields">
                                            <span v-if="item.title">{{ item.title }}</span><br>
                                            <v-select v-if="item.type=='select'"
                                                      height=35
                                                      :items="item.options"
                                                      item-text="title"
                                                      item-value="value"
                                                      outline
                                                      single-line
                                                      v-model="formdata[item.name]"
                                            ></v-select>

                                            <v-menu  v-else-if="item.type=='date'"
                                                    :close-on-content-click="true"
                                                    :nudge-right="40"
                                                    lazy
                                                    transition="scale-transition"
                                                    full-width
                                                    min-width="290px"
                                            >
                                                <v-text-field
                                                        slot="activator"
                                                        readonly
                                                        outline
                                                        height=35
                                                        :value=" formdata[item.name] | moment(item.format)"
                                                ></v-text-field>
                                                <v-date-picker
                                                        v-model="formdata[item.name]" no-title ></v-date-picker>
                                            </v-menu>

                                            <v-menu  v-else-if="item.type=='datetime'"
                                                     :close-on-content-click="false"
                                                     :nudge-right="40"
                                                     :return-value.sync="time"
                                                     lazy
                                                     transition="scale-transition"
                                                     offset-y
                                                     full-width
                                                     max-width="290px"
                                                     min-width="290px"
                                            >
                                                <v-text-field
                                                        slot="activator"
                                                        v-model="formdata[item.name]"
                                                        prepend-icon="access_time"
                                                        readonly
                                                        outline
                                                        height=35
                                                ></v-text-field>
                                                <v-time-picker
                                                        v-model="formdata[item.name]"
                                                        full-width
                                                ></v-time-picker>
                                            </v-menu>

                                            <input v-else :type="item.type" :name="item.name" :required="item.required"
                                                   :value="item.value"
                                                   v-model="formdata[item.name]"/>
                                        </div>

                                        <v-tabs v-if="forminfo.tabs" dark>
                                            <v-tab
                                                    v-for="(tabInfo, n) in forminfo.tabs"
                                                    :key="n"
                                                    ripple
                                            > {{tabInfo.title}}
                                            </v-tab>
                                            <v-tab-item
                                                    v-for="(tabInfo, n) in forminfo.tabs"
                                                    :key="n"
                                            >
                                                <v-card flat>
                                                    <v-card-text>
                                                        <div v-for="(subitem, subindex) in tabInfo.fields">
                                                            <div v-if="subitem.length == undefined ">
                                                                <v-flex v-if="subitem.type=='checkbox'||subitem.type=='toggle'">
                                                                    <input style="width: auto;transform: scale(1.5);"
                                                                           type="checkbox"
                                                                           :name="subitem.name"
                                                                           :required="subitem.required"
                                                                           :placeholder="subitem.placeholder"
                                                                           v-model="formdata[subitem.name]"
                                                                    />
                                                                    <span v-if="subitem.title"> {{ subitem.title }}<br></span>
                                                                </v-flex>
                                                                <div v-else>
                                                                    <span v-if="subitem.title">{{ subitem.title }}<br></span>

                                                                    <v-select v-if="subitem.type=='select'"
                                                                              height=35
                                                                              :items="subitem.options"
                                                                              item-text="title"
                                                                              item-value="value"
                                                                              outline
                                                                              single-line
                                                                              v-model="formdata[subitem.name]"
                                                                    ></v-select>

                                                                    <v-menu  v-else-if="subitem.type=='date'"
                                                                             :close-on-content-click="true"
                                                                             :nudge-right="40"
                                                                             lazy
                                                                             transition="scale-transition"
                                                                             full-width
                                                                             min-width="290px"
                                                                    >
                                                                        <v-text-field
                                                                                slot="activator"
                                                                                readonly
                                                                                outline
                                                                                height=35
                                                                                :value=" formdata[subitem.name] | moment(subitem.format)"
                                                                        ></v-text-field>
                                                                        <v-date-picker
                                                                                v-model="formdata[subitem.name]" no-title ></v-date-picker>
                                                                    </v-menu>

                                                                    <v-menu  v-else-if="subitem.type=='datetime'"
                                                                             :close-on-content-click="false"
                                                                             :nudge-right="40"
                                                                             :return-value.sync="time"
                                                                             lazy
                                                                             transition="scale-transition"
                                                                             offset-y
                                                                             full-width
                                                                             max-width="290px"
                                                                             min-width="290px"
                                                                    >
                                                                        <v-text-field
                                                                                slot="activator"
                                                                                v-model="formdata[subitem.name]"
                                                                                prepend-icon="access_time"
                                                                                readonly
                                                                                outline
                                                                                height=35
                                                                        ></v-text-field>
                                                                        <v-time-picker
                                                                                v-model="formdata[subitem.name]"
                                                                                full-width
                                                                        ></v-time-picker>
                                                                    </v-menu>

                                                                    <textarea v-else-if="subitem.type=='textarea'"
                                                                              :name="subitem.name"
                                                                              :placeholder="subitem.placeholder"
                                                                              v-model="formdata[subitem.name]">
                                                                    </textarea>
                                                                    <h3 v-else-if="subitem.type=='heading'"
                                                                        class="text-xs-center mb-2">
                                                                        {{subitem.value}}</h3>
                                                                    <h4 v-else-if="subitem.type=='text'"
                                                                        class="text-xs-center mb-2">
                                                                        {{subitem.value}}</h4>
                                                                    <div v-else-if="subitem.type=='image'">
                                                                        <ImageUpload :name="subitem.name"
                                                                                     :filenames="formdata[subitem.name]"></ImageUpload>
                                                                    </div>
                                                                    <div v-else-if="subitem.type=='files'">
                                                                        <FileUpload
                                                                                :name="subitem.name"
                                                                                :filenames="formdata[subitem.name]">
                                                                        </FileUpload>
                                                                    </div>
                                                                    <input v-else
                                                                           :type="subitem.type"
                                                                           :name="subitem.name"
                                                                           :required="subitem.required"
                                                                           :value="subitem.default"
                                                                           :min="subitem.min"
                                                                           :max="subitem.max"
                                                                           :step="subitem.step"
                                                                           :placeholder="subitem.placeholder"
                                                                           v-model="formdata[subitem.name]"/>
                                                                </div>
                                                            </div>
                                                            <div v-if="subitem.length > 0 ">
                                                                <div v-for="(sub, subN) in subitem">
                                                                    <v-flex v-if="sub.type=='checkbox'||sub.type=='toggle'">
                                                                        <input style="width: auto;transform: scale(1.5);"
                                                                               type="checkbox"
                                                                               :name="sub.name"
                                                                               :required="sub.required"
                                                                               :placeholder="sub.placeholder"
                                                                               v-model="formdata[sub.name]">
                                                                        <span v-if="sub.title"> {{ sub.title }}<br></span>
                                                                    </v-flex>
                                                                    <div v-else>
                                                                        <span v-if="sub.title">{{ sub.title }}<br></span>

                                                                        <v-select v-if="sub.type=='select'"
                                                                                  height=35
                                                                                  :items="sub.options"
                                                                                  item-text="title"
                                                                                  item-value="value"
                                                                                  outline
                                                                                  single-line
                                                                                  v-model="formdata[sub.name]"
                                                                        ></v-select>

                                                                        <v-menu  v-else-if="sub.type=='date'"
                                                                                 :close-on-content-click="true"
                                                                                 :nudge-right="40"
                                                                                 lazy
                                                                                 transition="scale-transition"
                                                                                 full-width
                                                                                 min-width="290px"
                                                                        >
                                                                            <v-text-field
                                                                                    slot="activator"
                                                                                    readonly
                                                                                    outline
                                                                                    height=35
                                                                                    :value=" formdata[sub.name] | moment(sub.format)"
                                                                            ></v-text-field>
                                                                            <v-date-picker
                                                                                    v-model="formdata[sub.name]" no-title ></v-date-picker>
                                                                        </v-menu>

                                                                        <v-menu  v-else-if="sub.type=='datetime'"
                                                                                 :close-on-content-click="false"
                                                                                 :nudge-right="40"
                                                                                 :return-value.sync="time"
                                                                                 lazy
                                                                                 transition="scale-transition"
                                                                                 offset-y
                                                                                 full-width
                                                                                 max-width="290px"
                                                                                 min-width="290px"
                                                                        >
                                                                            <v-text-field
                                                                                    slot="activator"
                                                                                    v-model="formdata[sub.name]"
                                                                                    prepend-icon="access_time"
                                                                                    readonly
                                                                                    outline
                                                                                    height=35
                                                                            ></v-text-field>
                                                                            <v-time-picker
                                                                                    v-model="formdata[sub.name]"
                                                                                    full-width
                                                                            ></v-time-picker>
                                                                        </v-menu>

                                                                        <textarea v-else-if="sub.type=='textarea'"
                                                                                  :name="sub.name"
                                                                                  :placeholder="sub.placeholder"
                                                                                  v-model="formdata[sub.name]">
                                                                        </textarea>
                                                                        <h3 v-else-if="sub.type=='heading'"
                                                                            class="text-xs-center mb-2">
                                                                            {{sub.value}}</h3>
                                                                        <h4 v-else-if="sub.type=='text'"
                                                                            class="text-xs-center mb-2">
                                                                            {{sub.value}}</h4>
                                                                        <div v-else-if="sub.type=='image'">
                                                                            <ImageUpload :name="sub.name"
                                                                                         :filenames="formdata[sub.name]"></ImageUpload>
                                                                        </div>
                                                                        <div v-else-if="sub.type=='files'">
                                                                            <FileUpload
                                                                                    :name="sub.name"
                                                                                    :filenames="formdata[sub.name]">
                                                                            </FileUpload>
                                                                        </div>
                                                                        <input v-else
                                                                               :type="sub.type"
                                                                               :name="sub.name"
                                                                               :value="sub.default"
                                                                               :min="sub.min"
                                                                               :max="sub.max"
                                                                               :step="sub.step"
                                                                               :placeholder="sub.placeholder"
                                                                               v-model="formdata[sub.name]"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </v-card-text>
                                                </v-card>
                                            </v-tab-item>
                                        </v-tabs>
                                        <v-btn color="blue darken-1" flat @click="saveNewDraft">Save as draft</v-btn>
                                        <v-btn color="blue darken-1" flat type="submit">Submit</v-btn>
                                    </form>
                                </div>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import FileUpload from "./FileUpload";
    import ImageUpload from "./ImageUpload";
    // import { moment } from 'vue-moment'

    export default {
        name: 'NewItems',
        components: {ImageUpload, FileUpload},
        props: {
            forminfo: {type: Object, required: true},
            formdata: {type: Object, required: true}
        },
        data() {
            return {
                file: '',
            }
        },
        methods: {
            ...mapActions(['submitNewItem', 'uploadFile']),
            ...mapMutations(['saveDraft']),
            submitNewForm() {
                let fileUploadFormData = new FormData();
                fileUploadFormData.append('file', this.file);

                // this.uploadFile(fileUploadFormData).then((data)=>{
                //     console.log('uploaded', data)
                this.submitNewItem(this.formdata).then(() => {
                    // this.$router.push('/itemslist')
                    // this.$refs.submitform.reset()
                    // for (let i in this.$store.state.formdata) {
                    //     this.$store.state.formdata[i]=null
                    // }
                    location.reload()
                })
                // })

                console.log('save', this.formdata)
            },
            saveNewDraft() {
                this.saveDraft({listID: this.$route.params.id, draftData: this.formdata})
                // localStorage.setItem('draft', JSON.stringify(this.formdata));
                this.$router.push('/list/' + this.$route.params.id)
            },
            formatDate (date, format) {
                if (!date) return null


                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
        }
    }
</script>

<style lang="scss">
    input, input[type=number], input[type=text], input[type=input], select, textarea {
        width: 100%;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-top: 6px;
        margin-bottom: 16px;
        resize: vertical;
    }

    .v-select__selections input, .v-text-field__slot input {
        border: none;
         margin-top: 5px;
         margin-bottom: 5px;
    }
    .v-input__slot,.v-select__selections {
        min-height: 30px !important;
        margin-bottom: 0px;
    }
    .v-input__append-inner{
        margin-top: 5px !important;
    }
    .v-input__prepend-outer {
        margin: 5px !important;
    }

    input[type=submit] {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    input[type=submit]:hover {
        background-color: #45a049;
    }
</style>
