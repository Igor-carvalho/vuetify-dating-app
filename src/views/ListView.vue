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
      <v-btn flat :to="'/home'" class="mr-0 ml-0 pl-0 pr-0" style="min-width: 30px;"><v-icon dark left class="mr-0 ml-0">arrow_back</v-icon></v-btn>
      <v-toolbar-title class="mr-0 ml-0 pl-0 pr-0 d-flex justify-center" style="width: 100%">
        {{submitteditems.title}}
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn flat @click="openNew"  class="mr-0 ml-0 pl-0 pr-0" style="min-width: 35px;">NEW</v-btn>
    </v-toolbar>
    <ItemsList :itemslist="submitteditems.items" />
    <DraftList/>
  </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    import ItemsList from '@/components/ItemsList.vue'
    import DraftList from "../components/DraftList";

    export default {
        name: 'ListView',
        components: {
            DraftList,
            ItemsList,
        },
        computed:{
            ...mapState(['submitteditems', 'submittednewitems', 'visitedList']),
        },
        watch: {
            'visitedList': function () {
                this.loadSubmittedItems(this.$route.params.id)
            }
        },
        created: function () {
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


<style>
  .v-toolbar__content {
    padding: 0px 5px!important;
  }
</style>
