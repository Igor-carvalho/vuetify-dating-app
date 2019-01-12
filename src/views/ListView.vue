<template>
  <div>
    <v-toolbar
            absolute
            color="teal lighten-3"
            dark
            scroll-off-screen
            scroll-target="#scrolling-techniques"
    >
      <!--<img width="30" height="30">-->
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>ListView</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn flat @click="openNew">NEW</v-btn>
    </v-toolbar>
    <ItemsList :itemslist="submitteditems" />
    <DraftList v-if="Object.keys(drafts).length>0" :draftlist="drafts" />
  </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    import ItemsList from '@/components/ItemsList.vue'
    import DraftList from "../components/DraftList";
    import VSelect from "vuetify/lib/components/VSelect/VSelect";

    export default {
        components: {
            VSelect,
            DraftList,
            ItemsList,
        },
        computed:{
            ...mapState(['submitteditems', 'submittednewitems', 'draftitems']),
            itemslist() {
                return {...this.submitteditems, ...this.submittednewitems}
            },
            drafts() {
                if (this.draftitems[this.$route.params.id]==undefined)
                    return []
                else
                  return this.draftitems[this.$route.params.id]
            }
        },
        created: function () {
            this.loadSubmittedItems(this.$route.params.id)
        },
        methods: {
            ...mapActions(['loadSubmittedItems']),
            openNew() {
                this.$router.push('/form/'+this.$route.params.id)
            }
        }
    }
</script>
