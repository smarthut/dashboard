<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 v-for="(socket, idx) in device.sockets" :key="idx">
        <v-card color="white" class="black--text">
          <v-container fluid grid-list-lg>
            <v-layout row align-center>
              <v-flex xs2 text-xs-center><span class="headline">{{ socket.value }}</span></v-flex>
              <v-flex xs>
                <div class="headline">{{ socket.location }}@{{ idx }}</div>
                <div>{{ socket.type }}</div>
              </v-flex>
              <v-flex xs3 text-xs-center v-if="deviceid === 'laurent112'">
                <v-btn color="success" v-if="socket.value === 0" v-on:click="onSubmit(idx, 1)">Enable</v-btn>
                <v-btn color="error" v-if="socket.value === 1" v-on:click="onSubmit(idx, 0)">Disable</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  props: ['deviceid'],
  data () {
    return {
      device: {},
      items: [
        { icon: 'memory', text: 'Devices' }
      ]
    }
  },
  created () {
    this.loadDevice()

    setInterval(() => {
      this.loadDevice()
    }, 100)
  },
  methods: {
    loadDevice () {
      // axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
      this.$http.get(`/api/v1/device/${this.deviceid}`)
        .then((resp) => {
          this.device = resp.data
        })
        .catch((e) => {
          this.errors.push(e)
        })
    },
    onSubmit (id, status) {
      this.$http.post('/api/v1/device/laurent112/socket', {
        'id': id,
        'status': status
      })
        .then(/* resp => alert(`Success ${resp.data}`) */)
        .catch((err) => {
          this.errors.push(err)
        })
    }
  }
}
</script>
