<template>
  <div class="login-page">
    <q-parallax :height="600">
      <div class="w-1/2 h-1/2">
        <q-card flat class="bg-white text-black">
          <div class="row">
            <div class="col-md-6 col-xs-12 q-pa-md">
              <q-img
                class="w-full h-full mx-auto object-cover"
                placeholder-src="/img/xr2.jpg"
                src="/img/xr2.jpg"
                spinner-color="white"
                style="max-height: 400px"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <router-view />
            </div>
          </div>
        </q-card>
      </div>
    </q-parallax>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.login-page {
  background-image: url("/img/xr1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>
