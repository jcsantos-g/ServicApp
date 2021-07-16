<template>
  <q-page padding>
    <VistaAcceso v-if="!isAuthenticated" />
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
