<template>
  <div>
    <slot v-bind:extensions="extensions">
      <tiptap-vuetify
        v-model="_content.description"
        :placeholder="`${$t('keywords.write')}…`"
        :extensions="extensions"
        :toolbar-attributes="{ color: 'tiptaptoolbar' }"
      >
      </tiptap-vuetify>
    </slot>
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  CodeBlock,
  Paragraph,
  Image,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";
export default {
  components: {
    TiptapVuetify,
  },
  props: {
    _content: {
      type: Object,
    },
  },
  data() {
    return {
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        Image,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        CodeBlock,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.delete-btn {
  float: right;
}
</style>