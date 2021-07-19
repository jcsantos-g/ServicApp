<template>
  <q-page padding>
    <VistaAcceso v-if="!isAuthenticated" />

    <div
      v-if="isAuthenticated"
      class="row justify-center text-center q-ma-md text-weight-bold text-h5"
    >
      Busca un usuario
    </div>

    <div
      v-if="isAuthenticated"
      class="row justify-center full-height full-width text-center"
    >
      <div class="buscador q-gutter-y-md column">
        <q-toolbar class="bg-indigo-6 text-white rounded-borders">
          <q-icon name="search" style="font-size: 2em"></q-icon>
          <q-space />

          <q-input
            class="buscador2"
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
    </div>
    <q-footer elevated v-if="isAuthenticated">
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
import VistaAcceso from "../components/VistaAcceso";

import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
export default {
  components: {
    VistaAcceso,
  },
  setup() {
    const { isAuthenticated, user } = useAuth(firebase.auth);

    return {
      user,
      isAuthenticated,
    };
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
@media (max-width: 1024px) {
  .buscador {
    width: 400px;
  }
  .buscador2 {
    width: 335px;
  }
}
@media (max-width: 767px) {
  .buscador {
    width: 300px;
  }
  .buscador2 {
    width: 235px;
  }
}
</style>
