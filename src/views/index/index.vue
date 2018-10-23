<template>
    <div class="main-content">
        <p>用户名：{{getUserName}}</p>
        <p>权限：{{getUserRoles}}</p>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUserName", "getUserRoles"])
  }
};
</script>
<style scoped>
.main-content {
  font-size: 2rem;
  line-height: 4rem;
}
</style>

