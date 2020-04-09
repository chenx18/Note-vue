<template>
  <div>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>
<script>
import appFooter from './../../components/app/footer';
export default {
  name: 'layout',
  data() {
    return {

    }
  },
  mounted() {

  },
  methodus: {

  },
  components: {
    appFooter
  }

}
</script>