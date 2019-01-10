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
                                    <form class="" @submit.prevent="submitNewForm">
                                    <div v-for="(item, index) in forminfo.fields">
                                        <span v-if="item.title">{{ item.title }}</span><br>
                                        <select v-if="item.type=='select'"></select>
                                        <input v-else :type="item.type" :name="item.name" :required="item.required"
                                               :value="item.value"
                                                v-model="formdata[item.name]"/>
                                    </div>

                                    <v-tabs v-if="forminfo.tabs" dark>
                                        <v-tab
                                                v-for="(tabInfo, n) in forminfo.tabs"
                                                :key="n"
                                                ripple
                                        >
                                            {{tabInfo.title=='Ticket'?'':tabInfo.title}}
                                        </v-tab>
                                        <v-tab-item
                                                v-for="(tabInfo, n) in forminfo.tabs"
                                                :key="n"
                                        >
                                            <v-card flat>
                                                <v-card-text>
                                                    <div v-if="tabInfo.title!='Ticket'">
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
                                                            <select v-if="subitem.type=='select'" :name="subitem.name"
                                                                    v-model="formdata[subitem.name]">
                                                                <option v-for="(selectitem, selectindex) in subitem.options"
                                                                        :value="selectitem.value">{{selectitem.title}}
                                                                </option>
                                                            </select>
                                                            <textarea v-else-if="subitem.type=='textarea'"
                                                                      :name="subitem.name"
                                                                      :placeholder="subitem.placeholder"
                                                                      v-model="formdata[subitem.name]">
                                                            </textarea>
                                                            <h3 v-else-if="subitem.type=='heading'"
                                                                class="text-xs-center mb-2">{{subitem.value}}</h3>
                                                            <h4 v-else-if="subitem.type=='text'"
                                                                class="text-xs-center mb-2">{{subitem.value}}</h4>
                                                            <input v-else-if="subitem.type=='image'||subitem.type=='files'"
                                                                   type="file"
                                                                   :name="subitem.name"
                                                                   :value="subitem.default"
                                                                   :placeholder="subitem.placeholder"
                                                                   ref="uploadfile" v-on:change="handleFileUpload()"/>
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
                                                                    <select v-if="sub.type=='select'" :name="sub.name"
                                                                            v-model="formdata[sub.name]">
                                                                        <option v-for="(opt, selectindex) in sub.options"
                                                                                :value="opt.value">{{opt.title}}
                                                                        </option>
                                                                    </select>
                                                                    <textarea v-else-if="sub.type=='textarea'"
                                                                              :name="sub.name"
                                                                              :placeholder="sub.placeholder"
                                                                              v-model="formdata[sub.name]">
                                                                    </textarea>
                                                                    <h3 v-else-if="sub.type=='heading'"
                                                                        class="text-xs-center mb-2">{{sub.value}}</h3>
                                                                    <h4 v-else-if="sub.type=='text'"
                                                                        class="text-xs-center mb-2">{{sub.value}}</h4>
                                                                    <input v-else-if="sub.type=='image'||sub.type=='files'"
                                                                           type="file"
                                                                           :name="sub.name"
                                                                           :required="true"
                                                                           :value="sub.default"
                                                                           :placeholder="sub.placeholder"/>
                                                                    <input v-else
                                                                           :type="sub.type"
                                                                           :name="sub.name"
                                                                           :required="true"
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
                                                    </div>
                                                </v-card-text>
                                            </v-card>
                                        </v-tab-item>
                                    </v-tabs>
                                        <v-btn color="blue darken-1" flat :to="{path: '/itemslist'}">Close</v-btn>
                                        <v-btn color="blue darken-1" flat type="submit">Save</v-btn>
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
    import { mapState, mapActions, mapMutations } from 'vuex'
    export default {
        name: 'NewItems',
        props: {
            forminfo: {type: Object, required: true},
            formdata: {type: Object, required: true}
        },
        data(){
            return {
                file: ''
            }
        },
        methods: {
            ...mapActions(['submitNewItem', 'uploadFile']),
            submitNewForm() {
                let fileUploadFormData = new FormData();
                fileUploadFormData.append('file', this.file);

                this.uploadFile(fileUploadFormData).then(()=>{
                    this.submitNewItem(this.formdata).then(()=>this.$router.push('/itemslist'))
                })

                console.log('save', this.formdata)
            },
            handleFileUpload(){
                console.log(this.$refs.uploadfile[0].files)
                this.file = this.$refs.uploadfile[0].files;
            }
        }
    }
</script>

<style lang="scss">
    input, input[type=date], input[type=number], input[type=text], input[type=input], select, textarea {
        width: 100%;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-top: 6px;
        margin-bottom: 16px;
        resize: vertical;
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
