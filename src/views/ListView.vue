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
    </v-toolbar>
    <ItemsList :itemslist="itemslist" />
  </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    import ItemsList from '@/components/ItemsList.vue'

    export default {
        components: {
            ItemsList,
        },
        computed:{
            ...mapState(['submitteditems', 'submittednewitems']),
            itemslist() {
                return {...this.submitteditems, ...this.submittednewitems}
            }
        },
        created: function () {
            this.loadSubmittedItems()
            console.log(this.itemslist)
        },
        methods: {
            ...mapActions(['loadSubmittedItems'])
        }
    }
</script>
