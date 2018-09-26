<template>
  <v-app>
    <v-navigation-drawer fixed clipped app v-model="drawer">
      <v-list subheader>
        <v-subheader>Devices</v-subheader>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue darken-2" dark app clipped-left fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>SmartHut</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="item in navItems"
          :key="item.title"
          flat
          :href="item.link"
          target="_blank"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      drawer: false,
      menuItems: [
        { icon: 'mdi-thermometer', title: 'MegaD 328', link: '/devices/megad328' },
        { icon: 'mdi-power-socket-eu', title: 'Laurent 112', link: '/devices/laurent112' }
      ],
      navItems: [
        { icon: 'mdi-chart-line', title: 'History', link: 'http://smarthut.infinityfreeapp.com/' },
        { icon: 'mdi-checkbox-marked-circle-outline', title: 'Status', link: 'https://status.smarthut.cc/' }
      ]
    }
  }
}
</script>
