<template>
  <q-page padding>
    <VistaAcceso />

    <!-- <div
      v-if="isAuthenticated"
      class="row justify-center text-center q-ma-md text-weight-bold text-h5"
    >
      Busca un usuario
    </div> -->

    <!-- <div
      v-if="isAuthenticated"
      class="row justify-center full-height full-width text-center"
    >
      <div class="buscador q-gutter-y-md column">
        <q-toolbar class="bg-indigo-6 text-white rounded-borders">
          <q-icon name="search" style="font-size: 2em"></q-icon>
          <q-space />

          <q-input
            class="buscador2"
            label="Buscar.."
            dark
            dense
            standout
            input-class="text-left"
          >
            <template v-slot:append>
              <q-icon name="clear" class="cursor-pointer" @click="text = ''" />
            </template>
          </q-input>
        </q-toolbar>
      </div>
    </div> -->
    <!-- <div class="q-pa-md q-gutter-sm">
      <q-card flat bordered v-for="(item, index) in usuarios" :key="index">
        <q-card-section v-html="item.id" />
        <q-card-section v-html="item.nombre" />
        <q-card-section v-html="item.correo" />
        <q-card-section v-html="item.estado" />
      </q-card>
    </div> -->
    <!-- usuarios -->
    <!-- <q-footer elevated v-if="isAuthenticated">
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
    </q-footer> -->
  </q-page>
</template>

<script>
import VistaAcceso from "../components/VistaAcceso";
// import { db } from "boot/firebase";
// import firebase from "firebase";
// import { useAuth } from "@vueuse/firebase/useAuth";
export default {
  components: {
    VistaAcceso,
  },
  data() {
    return {
      // usuarios: [],
    };
  },
  setup() {
    // const { isAuthenticated, user } = useAuth(firebase.auth);
    // return {
    //   user,
    //   isAuthenticated,
    // };
  },
  // created() {
  //   this.leerUsuarios();
  // },
  // methods: {
  //   // Trae los usuarios de la db
  //   async leerUsuarios() {
  //     try {
  //       // this.$q.loading.show();
  //       const query = await db.collection("users").get();
  //       // console.log("Esto trae: " + query.uid);
  //       query.forEach((element) => {
  //         let usuario = {
  //           id: element.data().uid,
  //           correo: element.data().correo,
  //           estado: element.data().estado,
  //           nombre: element.data().nombre,
  //         };
  //         this.usuarios.push(usuario);
  //         // console.log("Esto trae: " + this.usuarios);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     // finally {
  //     //   this.$q.loading.hide();
  //     // }
  //   },
  // },
};
</script>
