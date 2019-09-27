<template>
    <div v-if="status" class="v-overlay v-overlay--active theme--dark" style="z-index: 201;">
        <div class="v-overlay__scrim"></div>
        <div class="v-overlay__content">
            <v-progress-circular
                :size="150"
                color="white"
                indeterminate
            ></v-progress-circular>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters('loading', ['status'])
    }
}
</script>

<style scoped lang="scss">
.v-overlay {
    z-index: 201;

    .v-overlay__scrim {
        opacity: 0.46; 
        background-color: rgb(33, 33, 33); 
        border-color: rgb(33, 33, 33);
    }
}
</style>