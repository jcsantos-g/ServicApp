<template>
  <div class="column">
    <div class="row justify-center text-center q-py-md">
      <q-card class="my-card q-ma-xl">
        <!-- <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" /> -->

        <q-card-section>
          <div
            class="row no-wrap justify-center text-center items-center q-mt-md"
          >
            <div class="col text-h6 ellipsis">{{ user.displayName }}</div>
            <!-- <div
              class="
                col-auto
                text-grey text-caption
                q-pt-md
                row
                no-wrap
                items-center
              "
            >
              <q-icon name="place" />
              250 ft
            </div> -->
          </div>

          <!-- <q-rating v-model="stars" :max="5" size="32px" /> -->
        </q-card-section>

        <q-card-section class="q-pa-md">
          <div class="text-subtitle1">{{ user.email }}</div>
          <!-- <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div> -->
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

        <!-- <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat color="primary"> Reserve </q-btn>
        </q-card-actions> -->
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
