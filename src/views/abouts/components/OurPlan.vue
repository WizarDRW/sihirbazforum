<template>
  <v-container v-if="content">
    <v-card color="v_card_background">
      <div v-for="(item, index) in content.descriptions[$store.getters.getLangName]" :key="index">
        <v-card-title v-if="item.type == 'v-card-title'">
          {{ item.val }}
        </v-card-title>
        <v-card-subtitle v-if="item.type == 'v-card-subtitle'">
          {{ item.val }}
        </v-card-subtitle>
        <v-card-text v-if="item.type == 'v-card-text'">
          <div v-html="item.val"></div>
        </v-card-text>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      content: null,
    };
  },
  async mounted() {
    this.content = await this.$store.getters.getAbouts.find(
      (x) => x.type == "ourplan"
    );
  },
};
</script>

<style lang="">
</style>