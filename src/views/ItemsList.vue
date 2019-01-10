<template>
    <div>
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
