<template>
  <v-container v-if="forums">
    <div v-if="loading"></div>
    <v-row v-else>
      <v-col>
        <v-card v-if="selectedCat" color="v_card_background" tile>
          <v-card-title> {{ selectedCat.label[$store.getters.getLangName] }} </v-card-title>
        </v-card>
        <top :_forums="selectedFilterCategories" v-on:content="toContent" v-on:search="search"></top>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <time-line
          :_contents="filterTimeline"
          v-on:content="toContent"
        ></time-line>
      </v-col>
      <v-col md="3">
        <categories
          :_forums="forums"
          v-on:selectedCategory="selectedCategory"
        ></categories>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    TimeLine: () => import("@/components/TimeLine.vue"),
    Categories: () => import("./showcases/Category"),
    Top: () => import("./showcases/Top"),
  },
  data() {
    return {
      forums: null,
      filterForums: [],
      filterTimelineForums: [],
      categories: null,
      selectedCat: null,
      loading: true,
      searchString: ""
    };
  },
  async created() {
    if (!this.$store.getters.getForums)
      await this.$store.dispatch('getApiContent', {url: 'forums/client', content: 'setForums'});
    this.forums = this.$store.getters.getForums;
    if (this.forums) this.loading = false;
    this.filterForums = this.forums;
    this.filterTimeline = undefined;
  },
  computed: {
    selectedFilterCategories: {
      get() {
        return this.filterForums;
      },
      set(val) {
        this.filterForums = this.filter(val);
        this.selectedCat = val;
      },
    },
    filterTimeline: {
      get() {
        return this.filterTimelineForums;
      },
      set(val) {
        this.filterTimelineForums = this.filter(val).sort(
          (x, y) => new Date(y.create_date) - new Date(x.create_date)
        );
      },
    },
  },
  methods: {
    search(val) {
      this.searchString = val;
      this.selectedCategory(this.selectedCat)
    },
    filter(val) {
      return this.forums.filter((x) =>
        (val
          ? x.categories.some((y) => y.id === val.id)
          : true) && (this.searchString != ""
          ? x.name.toLowerCase().includes(this.searchString.toLowerCase())
          : true)
      );
    },
    selectedCategory(val) {
      this.selectedFilterCategories = val;
      this.filterTimeline = val;
    },
    toContent(content) {
      this.$store.commit('setForum', content);
      this.$router.push({ name: "ForumContent", params: { id: content._id } });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>