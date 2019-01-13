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

      <v-toolbar-title>
        <v-btn flat :to="'/home'"><v-icon dark left>arrow_back</v-icon></v-btn>
        {{submitteditems.title}}
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn flat @click="openNew">NEW</v-btn>
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
