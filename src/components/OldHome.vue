<template>
  <main>
    <v-navigation-drawer fixed clipped app v-model="drawer">
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout row v-if="item.heading" align-center :key="i">
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue darken-3" dark app clipped-left fixed>
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-xs-only">SmartHut Dashboard</span>
      </v-toolbar-title>
      <!-- <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
      </div> -->
    </v-toolbar>
    <v-content>
      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <v-flex xs6 v-for="(socket, idx) in sensors.sockets" :key="idx">
            <v-card color="white" class="black--text">
              <v-container fluid grid-list-lg>
                <v-layout row align-center>
                  <v-flex xs2>
                    {{ socket.value }}<span v-if="socket.type === 'temperature'">&#8451;</span>
                  </v-flex>
                  <v-flex xs10>
                    <div>
                      <div class="headline">{{ socket.location }}@{{ idx }}</div>
                      <div>{{ socket.type }}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6 v-for="(socket, idx) in relays.sockets" :key="idx">
            <v-card color="white" class="black--text">
              <v-container fluid grid-list-lg>
                <v-layout row align-center>
                  <v-flex xs2>
                    {{ socket.value }}<span v-if="socket.type === 'temperature'">&#8451;</span>
                  </v-flex>
                  <v-flex xs10>
                    <div>
                      <div class="headline">{{ socket.location }}@{{ idx }}</div>
                      <div>{{ socket.type }}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </main>
  <!-- <main>
    <header class="hero is-medium is-info">
      <div class="hero-head">
        <div class="container">
          <nav class="navbar is-info">
            <div class="navbar-brand">
              <a class="navbar-item" href="/">SmartHut</a>
            </div>
          </nav>
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">Smart Hut</h1>
        </div>
      </div>
    </header>
    <section class="section is-small">
      <div class="container">
        <h2 class="title is-2">Sensors</h2>
        <h4 class="subtitle is-4">{{ sensors.updated_at | moment("YYYY MMM DD HH:mm:ss") }}</h4>
        <div class="columns is-multiline">
          <div class="column is-half is-one-third-desktop" v-for="(socket, idx) in sensors.sockets">
            <div class="card">
              <div class="card-content">
                <div class="columns is-mobile is-vcentered">
                  <div class="column is-2 has-text-centered">
                    {{ socket.value }}<span v-if="socket.type === 'temperature'">&#8451;</span>
                  </div>
                  <div class="column">
                    <h4 class="title is-5">{{ socket.location }}@{{ idx }}</h4>
                    <h4 class="subtitle is-6">{{ socket.type }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section is-small">
      <div class="container">
        <h2 class="title is-2">Switch</h2>
        <h4 class="subtitle is-4">{{ relays.updated_at | moment("YYYY MMM DD HH:mm:ss") }}</h4>
        <div class="columns is-multiline">
          <div class="column is-half is-one-third-desktop" v-for="(socket, idx) in relays.sockets">
            <div class="card">
              <div class="card-content">
                <div class="columns is-mobile is-vcentered">
                  <div class="column is-2 has-text-centered">
                    <span class="has-text-danger" v-if="socket.value === 0">off</span>
                    <span class="has-text-success" v-else>on</span>
                  </div>
                  <div class="column">
                    <h4 class="title is-5">{{ socket.location }}@{{ idx }}</h4>
                    <h4 class="subtitle is-6">{{ socket.type }}</h4>
                  </div>
                  <div class="column is-4 has-text-right">
                    <button class="button" v-if="socket.value === 0" v-on:click="onSubmit(idx, 1)">Enable</button>
                    <button class="button" v-else v-on:click="onSubmit(idx, 0)">Disable</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <div class="level">
            <div class="level-left"></div>
            <div class="level-right">
              <a class="level-item" href="https://smarthut.000webhostapp.com/">History</a>
              <a class="level-item" href="https://status.smarthut.cc">Status</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </main> -->
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      sensors: {},
      relays: {},
      dialog: false,
      drawer: null,
      items: [
        { icon: 'memory', text: 'Devices' }
      ]
    }
  },
  created () {
    this.loadSensors()
    this.loadRelay()

    setInterval(() => {
      this.loadSensors()
      this.loadRelay()
    }, 100)
  },
  methods: {
    loadSensors () {
      // axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
      this.$http.get('/api/v1/device/megad328')
        .then((resp) => {
          this.sensors = resp.data
        })
        .catch((e) => {
          this.errors.push(e)
        })
    },
    loadRelay () {
      this.$http.get('/api/v1/device/laurent112')
        .then((resp) => {
          this.relays = resp.data
        })
        .catch((err) => {
          this.errors.push(err)
        })
    },
    onSubmit (id, status) {
      this.$http.post('/api/v1/device/laurent112/socket', {
        'id': id,
        'value': status
      })
        .then(/* resp => alert(`Success ${resp.data}`) */)
        .catch((err) => {
          this.errors.push(err)
        })
    }
  }
}
</script>
