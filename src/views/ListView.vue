<template>
  <div>
    <v-toolbar
            absolute
            color="teal lighten-3"
            dark
            scroll-off-screen
            scroll-target="#scrolling-techniques"
            style="position: fixed"
    >
      <!--<img width="30" height="30">-->
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>ListView</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn flat @click="openNew">NEW</v-btn>
    </v-toolbar>
    <ItemsList :itemslist="submitteditems" />
    <DraftList/>
  </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    import ItemsList from '@/components/ItemsList.vue'
    import DraftList from "../components/DraftList";
    import VSelect from "vuetify/lib/components/VSelect/VSelect";

    export default {
        name: 'ListView',
        components: {
            VSelect,
            DraftList,
            ItemsList,
        },
        computed:{
            ...mapState(['submitteditems', 'submittednewitems']),
            itemslist() {
                return {...this.submitteditems, ...this.submittednewitems}
            },
        },
        created: function () {
            this.loadSubmittedItems(this.$route.params.id)
        },
        updated: function () {
            this.loadSubmittedItems(this.$route.params.id)
        },
        methods: {
            ...mapActions(['loadSubmittedItems']),
            openNew() {
                this.$store.state.formdata = {}
                this.$store.state.draftid=''
                this.$router.push('/form/'+this.$route.params.id)
            }
        }
    }
</script>
