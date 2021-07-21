<template>
  <div class="column">
    <div class="row justify-center text-center q-py-md">
      <q-card class="my-card q-ma-xl">
        <!-- <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" /> -->

        <q-card-section>
          <div
            class="row no-wrap justify-center text-center items-center q-mt-md"
          >
            <div class="col text-h6 ellipsis">
              {{ isAuthenticated ? user.displayName : "Cargando..." }}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-md">
          <div class="text-subtitle1">
            {{ isAuthenticated ? user.email : "Cargando..." }}
          </div>
        </q-card-section>

        <!-- <q-separator /> -->
        <q-btn
          outline
          rounded
          no-caps
          color="indigo-6"
          label="Mensaje"
          icon-right="send"
          class="q-ma-md"
        />
      </q-card>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
export default {
  name: "Perfil",
  setup() {
    const { isAuthenticated, user } = useAuth(firebase.auth);
    // const user = firebase.auth().currentUser;
    // if (user == null) {
    //   const displayName = "";
    //   const email = "";
    //   const emailVerified = "";
    //   const uid = "";
    // }
    return {
      isAuthenticated,
      user,
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>
