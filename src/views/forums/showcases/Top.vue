<template>
  <div>
    <v-card color="v_card_background">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Ara"
          single-line
          hide-details
          outlined
          dense
        ></v-text-field>
      </v-card-title>

      <div class="table">
        <table border="0" cellspacing="0" cellpadding="0" width="100%">
          <tbody v-for="(item, index) in listPag()" :key="index">
            <tr @click="toContent(item)">
              <td width="20px">
                <v-avatar
                  ><v-img
                    :src="
                      item.user_data.image_path
                        ? item.user_data.image_path
                        : require('@/assets/vendor/img/null_profile.png')
                    "
                  ></v-img
                ></v-avatar>
              </td>
              <td v-if="item.user_data.username">@{{ item.user_data.username }}</td>
              <td v-if="item.user_data.email">{{ item.user_data.email }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.create_date | moment("DD MMMM YYYY HH:mm") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <v-pagination v-model="page" color="tertiary" :length="pages"></v-pagination>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    _forums: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        {
          text: "create_date",
          value: "create_date",
          width: "100px",
        },
        {
          text: "name",
          value: "name",
          width: "auto",
        },
        {
          text: "description",
          value: "description",
        },
      ],
      datas: [],
      page: 1,
      pages: 0,
      pagPage: 3,
      search: "",
    };
  },
  methods: {
    /** Sayfalama */
    pagination() {
      var arr = this.datas;
      this.pages = Math.ceil(arr.length / this.pagPage);
      var arrPages = [];
      let count = 0;
      for (let i = 0; i < this.pages; i++) {
        var a = [];
        for (let j = 0; j < this.pagPage; j++) {
          if (arr[count]) {
            a.push({ ...arr[count] });
            count++;
          }
        }
        arrPages.push(a);
      }
      return arrPages;
    },
    /** Seçilen Sayfalama */
    listPag() {
      this.datas = this._forums;
      return this.pagination()[this.page - 1];
    },
    toContent(item) {
      this.$emit("content", item);
    },
  },
  watch: {
    search(val) {
      this.$emit("search", val);
    },
  },
};
</script>

<style lang="scss" scoped>
table tbody tr td {
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  border: none;
  color: var(--v-form_showcase_top_table_color-base);
}
table tbody tr:hover {
  background-color: var(--v-form_showcase_top_table_hover_background-base);
}
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }
}
</style>