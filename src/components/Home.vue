<template>
  <main>
    <v-navigation-drawer fixed clipped app v-model="drawer">
      <v-list subheader>
        <v-subheader>Devices</v-subheader>
        <v-list-tile @click="" v-for="item in menuItems" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue darken-2" dark app clipped-left fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>SmartHut</v-toolbar-title>
    </v-toolbar>
  </main>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      drawer: false,
      menuItems: [
        { icon: 'mdi-thermometer', title: 'MegaD 328', link: '/laurent112' },
        { icon: 'mdi-power-socket-eu', title: 'Laurent 112', link: '/megad328' }
      ]
    }
  }
}
</script>
