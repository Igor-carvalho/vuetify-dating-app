<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-title class="text-xs-center mb-0 pb-0">
                        <v-flex xs12 sm12 md12>
                            <img v-if="forminfo.logo" :src="forminfo.logo" width="120" height="120"></img>
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
                                            <span v-if="item.title && item.type!='checkbox' && item.type!='toggle'">{{ item.title }}<br></span>
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
                                                     class="mb-1"
                                            >
                                                <v-text-field
                                                        slot="activator"
                                                        readonly
                                                        outline
                                                        height=35
                                                        hide-details
                                                        :value=" formdata[item.name] | moment(item.format)"
                                                ></v-text-field>
                                                <v-date-picker
                                                        v-model="formdata[item.name]" no-title ></v-date-picker>
                                            </v-menu>

                                            <v-menu  v-else-if="item.type=='datetime'"
                                                     :close-on-content-click="false"
                                                     :nudge-right="40"
                                                     lazy
                                                     transition="scale-transition"
                                                     offset-y
                                                     full-width
                                                     max-width="290px"
                                                     min-width="290px"
                                                     class="mb-1"
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
                                            <div v-else-if="item.type=='image'">
                                                <ImageUpload :name="item.name"
                                                             :filenames="formdata[item.name]"></ImageUpload>
                                            </div>
                                            <div v-else-if="item.type=='files'">
                                                <FileUpload
                                                        :name="item.name"
                                                        :filenames="formdata[item.name]">
                                                </FileUpload>
                                            </div>
                                            <v-flex v-else-if="item.type=='checkbox'||item.type=='toggle'" class="d-flex">
                                                <input style="width: auto;transform: scale(1.4); flex: none!important;"
                                                       type="checkbox"
                                                       :value="item.title"
                                                       :name="item.name"
                                                       :required="item.required"
                                                       :placeholder="item.placeholder"
                                                       v-model="formdata[item.name]">
                                                <span v-if="item.title" class="ml-2"> {{ item.title }}<br></span>
                                            </v-flex>
                                            <h3 v-else-if="item.type=='heading'"
                                                class="text-xs-center mb-2">
                                                {{item.value}}</h3>
                                            <h4 v-else-if="item.type=='text'"
                                                class="text-xs-center mb-2">
                                                {{item.value}}</h4>
                                            <input v-else :type="item.type" :name="item.name" :required="item.required"
                                                   :value="item.value"
                                                   v-model="formdata[item.name]"/>
                                        </div>

                                        <v-tabs v-if="forminfo.tabs" light ref="tabsRef">
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
                                                                    <input style="width: auto;transform: scale(1.3);"
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
                                                                             class="mb-1"
                                                                    >
                                                                        <v-text-field
                                                                                slot="activator"
                                                                                readonly
                                                                                outline
                                                                                height=35
                                                                                hide-details
                                                                                :value=" formdata[subitem.name] | moment(subitem.format)"
                                                                        ></v-text-field>
                                                                        <v-date-picker
                                                                                v-model="formdata[subitem.name]" no-title ></v-date-picker>
                                                                    </v-menu>

                                                                    <v-menu  v-else-if="subitem.type=='datetime'"
                                                                             :close-on-content-click="false"
                                                                             :nudge-right="40"
                                                                             lazy
                                                                             transition="scale-transition"
                                                                             offset-y
                                                                             full-width
                                                                             max-width="290px"
                                                                             min-width="290px"
                                                                             class="mb-1"
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
                                                                           v-model="formdata[subitem.name]"
                                                                           />
                                                                </div>
                                                            </div>
                                                            <v-flex v-if="subitem.length > 0 " class="subTab d-flex">
                                                                <div v-for="(sub, subN) in subitem" class="mr-3 ml-3 xs6 sm6 md6" style="width: 50%;">
                                                                    <span v-if="sub.title && sub.type!='checkbox'&& sub.type!='toggle'" class="d-flex justify-center">{{ sub.title }}</span>

                                                                    <v-flex v-if="sub.type=='checkbox'||sub.type=='toggle'">
                                                                        <input style="width: auto;transform: scale(1.3);"
                                                                               type="checkbox"
                                                                               :name="sub.name"
                                                                               :required="sub.required"
                                                                               :placeholder="sub.placeholder"
                                                                               v-model="formdata[sub.name]">
                                                                        <span v-if="sub.title"> {{ sub.title }}</span>
                                                                    </v-flex>
                                                                    <v-select v-else-if="sub.type=='select'"
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
                                                                             class="mb-1"
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
                                                                             lazy
                                                                             transition="scale-transition"
                                                                             offset-y
                                                                             full-width
                                                                             max-width="290px"
                                                                             min-width="290px"
                                                                             class="mb-1"
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
                                                                    <!--<div >-->
                                                                        <v-text-field v-else-if="sub.type=='currency'"
                                                                                type="number"
                                                                                v-model="formdata[sub.name]"
                                                                                outline
                                                                                min="0"
                                                                                height=33
                                                                                hide-details
                                                                        ></v-text-field>
                                                                    <!--</div>-->
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
                                                            </v-flex>
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

    export default {
        name: 'NewItems',
        components: {ImageUpload, FileUpload},
        props: {
            forminfo: {type: Object, required: true},
        },
        computed: {
            ...mapState(['draftitems', 'formdata']),
        },
        methods: {
            ...mapActions(['submitNewItem']),
            ...mapMutations(['saveDraft']),
            submitNewForm() {
                // console.log('formdat',this.formdata)
                this.submitNewItem({formdata:this.formdata, id:this.$route.params.id}).then(()=>{
                    this.$router.push('/list/' + this.$route.params.id)
                })

            },
            saveNewDraft() {
                this.saveDraft({listID: this.$route.params.id, draftData: this.formdata, draftID: this.$store.state.draftid})

                this.$router.push('/list/' + this.$route.params.id)
            },
        }
    }
</script>

<style lang="scss">
    input, input[type=number], input[type=text], input[type=input], select, textarea{
        width: 100%;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin: 5px 0px!important;
        resize: vertical;
    }

    .v-select__selections input, .v-text-field__slot input {
        border: none;
         margin-top: 5px;
         margin-bottom: 5px;
    }
    .v-input__slot {
        min-height: 30px !important;
        margin-bottom: 0px;
        border: 1px solid #ccc !important;
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

    .container {
        padding: 0px !important;
    }
    .subTab input, .subTab select, .subTab textarea,  .subTab .v-text-field,  .subTab span  {
        /*margin-left: 10px;*/
        margin: 0px!important;
    }
</style>
