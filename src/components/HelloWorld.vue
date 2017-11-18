<template>
  <main>
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
        <h4 class="subtitle is-4">{{ sensors.updated_at }}</h4>
        <div class="columns is-multiline">
          <div class="column is-half is-one-third-desctop" v-for="(socket, idx) in sensors.sockets">
            <div class="card">
              <div class="card-content">
                <div class="columns is-mobile is-vcentered">
                  <div class="column is-2 has-text-centered">
                    {{ socket.value }}
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
        <h4 class="subtitle is-4">{{ relays.updated_at }}</h4>
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
                    <button class="button" v-if="socket.value === 0" v-on:click="onSubmit(idx, 1)">Enable {{ idx }}</button>
                    <button class="button" v-else v-on:click="onSubmit(idx, 0)">Disable {{ idx }}</button>
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
  </main>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      host: 'https://smarthut.cc',
      sensors: {},
      relays: {},
      // sensors: {"host":"http://megad328:8080","updated_at":"2017-11-17T22:27:12.438639898Z","sockets":[{"value":"ON/4","type":"disabled","location":"none"},{"value":3.37,"type":"temperature","location":"Bathroom (1st floor)"},{"value":2.93,"type":"temperature","location":"Bedroom (1st floor)"},{"value":3,"type":"temperature","location":"Living Room (North)"},{"value":3.18,"type":"temperature","location":"Living Room (South)"},{"value":3.5,"type":"temperature","location":"Steamshop"},{"value":3.75,"type":"temperature","location":"Bathroom (2nd floor)"},{"value":4,"type":"temperature","location":"East Bedroom (2nd floor)"},{"value":4.81,"type":"temperature","location":"Server Room"},{"value":3.5,"type":"temperature","location":"West Bedroom 2"},{"value":3.56,"type":"temperature","location":"Street"},{"value":"NA","type":"disabled","location":"none"},{"value":"NA","type":"disabled","location":"none"},{"value":"OFF/0","type":"disabled","location":"none"}]},
      // relays: {"host":"http://laurent112:8080","updated_at":"2017-11-17T22:30:47.2918105Z","sockets":[{"value":0,"type":"relay","location":"none"},{"value":0,"type":"relay","location":"none"},{"value":0,"type":"relay","location":"none"},{"value":0,"type":"relay","location":"none"},{"value":0,"type":"relay","location":"none"},{"value":0,"type":"relay","location":"none"},{"value":0,"type":"relay","location":"none"},{"value":0,"type":"relay","location":"none"},{"value":0,"type":"relay","location":"none"},{"value":0,"type":"relay","location":"none"},{"value":0,"type":"relay","location":"none"},{"value":0,"type":"relay","location":"none"}]},
    };
  },
  created() {
    this.loadSensors();
    this.loadRelay();
  },
  methods: {
    loadSensors() {
      // axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
      this.$http.get(`${this.host}/api/v2/device/megad328`)
      .then((resp) => {
        this.sensors = resp.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    loadRelay() {
      this.$http.get(`${this.host}/api/v2/device/laurent112`)
      .then((resp) => {
        this.sensors = resp.data;
      })
      .catch((err) => {
        this.errors.push(err);
      });
    },
    onSubmit(id, status) {
      this.$http.post(`${this.host}/api/v2/device/laurent112/${id}`, {
        num: status,
      })
      .then(resp => alert(`Success ${resp.data}`))
      .catch((err) => {
        this.errors.push(err);
      });
    },
  },
  // filters: {
  //   formatTime(value) {
  //     const fmt = this.moment(String(value)).format('YYYY MMM DD HH:mm:ss');
  //     return fmt;
  //   },
  // },
};
</script>
