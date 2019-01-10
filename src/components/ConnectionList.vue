<template>
  <div>
    <v-list subheader>
        <v-subheader>Recent connections</v-subheader>
        <v-list-tile v-for="(item, key) in connections" :key="key" avatar :to="{path: '/profile/' + item.id}">
            <v-list-tile-avatar>
                <img :src="item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>

    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
    name: 'ConnectionList',
    props: {
        connections: { type: Object, required: true }
    }
}
</script>

<style lang="scss">
</style>
