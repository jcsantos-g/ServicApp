<template>
  <q-page padding>
    <!-- TITULO -->
    <div
      class="row justify-center text-center q-ma-md text-weight-bold text-h5"
    >
      Busca un usuario
    </div>
    <!-- BUSCADOR -->
    <div class="row justify-center full-height full-width text-center">
      <div class="buscador q-gutter-y-md column">
        <q-toolbar class="bg-indigo-6 text-white rounded-borders">
          <q-icon name="search" style="font-size: 2em"></q-icon>
          <q-space />
          <!-- INPUT SEARCH -->
          <q-input
            class="buscador2"
            label="Buscar..."
            dark
            dense
            standout
            input-class="text-left"
            v-model="filtro"
          >
            <template v-slot:append>
              <q-icon
                name="clear"
                class="cursor-pointer"
                @click="limpiarBuscador"
              />
            </template>
          </q-input>
        </q-toolbar>
      </div>
    </div>
    <div class="row justify-center full-height full-width">
      <!-- <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Contacts</q-toolbar-title>
      </q-toolbar> -->

      <q-list bordered separator class="resultados">
        <q-item
          v-for="(item, index) in usuariosFiltrados"
          :key="index"
          class="q-my-sm"
          clickable
          v-ripple
        >
          <!-- <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ contact.letter }}
            </q-avatar>
          </q-item-section> -->

          <q-item-section>
            <q-item-label>{{ item.nombre }}</q-item-label>
            <q-item-label caption lines="1">{{ item.correo }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn flat round color="indigo-6" icon="send" />
          </q-item-section>
        </q-item>
        <!-- <q-separator /> -->
      </q-list>
    </div>
    <!-- CARD USUARIOS -->
    <!-- <div class="q-pa-md q-gutter-sm"> -->
    <!-- Donde se pinta -->
    <!-- <q-card
        flat
        bordered
        v-for="(item, index) in usuariosFiltrados"
        :key="index"
      > -->
    <!-- <q-card-section v-html="item.id" /> -->
    <!-- <q-card-section v-html="item.nombre" />
        <q-card-section v-html="item.correo" /> -->
    <!-- <q-card-section v-html="item.estado" /> -->
    <!-- </q-card>
    </div> -->
    <!-- FOOTER -->
    <q-footer elevated>
      <q-btn-group spread>
        <q-btn
          to=""
          color="indigo-10"
          size="17px"
          icon="person_search"
          class="text-grey-4"
          label=""
        />
        <q-separator vertical color="indigo-8" />
        <q-btn
          to=""
          color="indigo-10"
          size="17px"
          icon="campaign"
          class="text-grey-4"
          label=""
        />
      </q-btn-group>
    </q-footer>
  </q-page>
</template>

<script>
import { db } from "boot/firebase";
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
export default {
  data() {
    return {
      usuarios: [],
      usuariosFiltrados: [],
      texto: "",
    };
  },
  computed: {
    filtro: {
      get() {
        return this.texto;
      },
      set(value) {
        value = value.toLowerCase();
        this.usuariosFiltrados = this.usuarios.filter(
          (item) => item.nombre.toLowerCase().indexOf(value) !== -1
        );
        this.texto = value;
        if (value == "" || value == " ") {
          this.usuariosFiltrados = [];
        }
      },
    },
  },
  setup() {
    const { isAuthenticated, user } = useAuth(firebase.auth);

    return {
      user,
      isAuthenticated,
    };
  },
  created() {
    this.leerUsuarios();
    // this.usuariosFiltrados = this.usuarios;
  },
  methods: {
    // Trae los usuarios de la db
    async leerUsuarios() {
      try {
        // this.$q.loading.show();
        const query = await db.collection("users").get();
        query.forEach((element) => {
          let usuario = {
            id: element.data().uid,
            correo: element.data().correo,
            estado: element.data().estado,
            nombre: element.data().nombre,
          };
          this.usuarios.push(usuario);
        });
      } catch (error) {
        console.log(error);
      }
      // finally {
      //   this.$q.loading.hide();
      // }
    },

    limpiarBuscador() {
      this.usuariosFiltrados = [];
      this.texto = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.buscador {
  width: 500px;
  max-width: 100%;
}
.buscador2 {
  width: 435px;
  max-width: 100%;
}
.resultados {
  width: 500px;
}
@media (max-width: 1024px) {
  .buscador {
    width: 400px;
  }
  .buscador2 {
    width: 335px;
  }
  .resultados {
    width: 400px;
  }
}
@media (max-width: 767px) {
  .buscador {
    width: 300px;
  }
  .buscador2 {
    width: 235px;
  }
  .resultados {
    width: 300px;
  }
}
</style>
