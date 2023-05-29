<template>
  <div>
    <article-detail>
      <span slot="header" slot-scope="slotProps">
        <div class="text-muted m-1 d-flex justify-content-start" style="font-size: medium">
          관리자 | {{ slotProps.article.registerTime }}
        </div>
      </span>

      <span slot="footer" slot-scope="slotProps">
        <div v-if="true">
          <b-row class="mb-1">
            <b-col class="text-right">
              <b-button
                class="m-1"
                style="font-size: small"
                size="sm"
                variant="outline-primary"
                @click="slotProps.moveModifyArticle()"
              >
                <b-icon icon="pencil-fill"></b-icon>
              </b-button>
              <b-button
                style="font-size: small"
                size="sm"
                variant="outline-danger"
                @click="slotProps.deleteArticle()"
              >
                <b-icon icon="trash-fill"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </div>
      </span>
    </article-detail>
  </div>
</template>

<script>
import ArticleDetail from "@/components/common/ArticleDetail.vue";

export default {
  name: "NoticeDetail",
  components: {
    ArticleDetail,
  },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
