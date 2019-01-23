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
            <v-btn flat :to="'/settings'" class="ml-0 mr-0 pl-0 pr-0" style="min-width: 30px">
                <v-icon dark left>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title class="mr-0 ml-0 pl-0 pr-0 d-flex justify-center" style="width: 100%">
                Change language
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <div class="mr-0 ml-0 pl-0 pr-0" style="min-width: 35px;"></div>
        </v-toolbar>

        <v-flex xs12 sm6 offset-sm3>
            <v-list two-line>
                <template>
                    <v-divider></v-divider>
                    <v-list-tile avatar ripple>
                        <v-list-tile-avatar></v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>French</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-checkbox v-model="lang" color="primary" value="french"></v-checkbox>
                        </v-list-tile-action>

                    </v-list-tile>

                    <v-divider></v-divider>

                    <v-list-tile avatar ripple>
                        <v-list-tile-avatar></v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>English</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-checkbox v-model="lang" color="primary" value="english"></v-checkbox>
                        </v-list-tile-action>

                    </v-list-tile>
                    <v-divider></v-divider>
                </template>
            </v-list>
        </v-flex>
    </div>
</template>
<script>
    import VCheckbox from "vuetify/lib/components/VCheckbox/VCheckbox";

    export default {
        components: {VCheckbox},
        data() {
            return {
                lang: 'english'
            }
        }
    }
</script>
