<template>
  <div class="row justify-center full-height full-width text-center q-pa-md">
    <q-card class="my-card" flat bordered>
      <q-card-section class="bg-indigo-6 text-white q-pa-lg">
        <div class="text-h5">
          {{ acceder ? "Inicia Sesión" : "Regístrate" }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="">
        <q-form class="q-gutter-md q-pa-lg" @submit.prevent="registro">
          <q-input
            filled
            color="indigo-10"
            label="Nombre"
            v-if="!acceder"
            v-model="name"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input filled color="indigo-10" label="Correo" v-model="email">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input
            filled
            :type="isPwd ? 'password' : 'text'"
            color="indigo-10"
            label="Contraseña"
            v-model="password"
            class="items-center"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="justify-center items-center text-center q-mt-xl">
            <q-btn
              rounded
              dense
              size="lg"
              class="full-width"
              color="indigo-10"
              type="submit"
              >{{ acceder ? "Iniciar" : "Aceptar" }}</q-btn
            >
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          no-caps
          color="green-9"
          outline
          @click="acceder = true"
          v-if="!acceder"
        >
          Ya tengo una cuenta
        </q-btn>
        <q-btn no-caps color="negative" outline @click="acceder = false" v-else>
          Crear una cuenta
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { Notify } from "quasar";
import { ref } from "vue";
import { auth, db } from "boot/firebase";
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
export default {
  setup() {
    const email = ref("prueba@prueba.com");
    const password = ref("123123");
    const name = ref("Juan Santos");

    const acceder = ref(true);

    const { isAuthenticated, user } = useAuth(firebase.auth);

    const registro = async () => {
      if (!email.value.trim() || !password.value.trim()) {
        console.log("campos vacios");
        Notify.create({
          icon: "error",
          progress: true,
          color: "negative",
          textColor: "white",
          message: "No ha completado todos los campos",
        });
        return;
      }
      try {
        if (acceder.value) {
          //Iniciar sesion
          const userCredential = await auth.signInWithEmailAndPassword(
            email.value,
            password.value
          );
          const userDB = userCredential.user;
          await db.collection("users").doc(userDB.uid).update({
            estado: true,
          });
        } else {
          //Registro
          const userCredential = await auth.createUserWithEmailAndPassword(
            email.value,
            password.value
          );
          const user = firebase.auth().currentUser;

          if (user) {
            user
              .updateProfile({
                displayName: name.value,
                // photoURL: "https://example.com/jane-q-user/profile.jpg",
              })
              .then(() => {
                console.log("Nombre guardado: " + user.displayName);
              })
              .catch((error) => {
                console.log("Nombre no guardado");
              });
          }

          const userDB = userCredential.user;
          await db.collection("users").doc(userDB.uid).set({
            nombre: name.value,
            correo: userDB.email,
            uid: userDB.uid,
            estado: true,
          });
        }
        email.value = "";
        password.value = "";
      } catch (error) {
        console.log(error);
        if (error.code == "auth/email-already-in-use") {
          Notify.create({
            icon: "error",
            progress: true,
            color: "negative",
            textColor: "white",
            message: "Este correo ya está en uso por otro usuario",
          });
        } else if (error.code == "auth/invalid-email") {
          Notify.create({
            icon: "error",
            progress: true,
            color: "negative",
            textColor: "white",
            message: "Correo no válido",
          });
        } else if (error.code == "auth/user-not-found") {
          Notify.create({
            icon: "error",
            progress: true,
            color: "negative",
            textColor: "white",
            message: "El usuario no está registrado",
          });
        } else if (error.code == "auth/wrong-password") {
          Notify.create({
            icon: "error",
            progress: true,
            color: "negative",
            textColor: "white",
            message: "Contraseña incorrecta",
          });
        } else {
          Notify.create({
            icon: "error",
            progress: true,
            color: "negative",
            textColor: "white",
            message: error.message,
          });
        }
      }
    };

    return {
      name,
      email,
      password,
      isPwd: ref(true),
      registro,
      acceder,
      isAuthenticated,
      user,
    };
  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
