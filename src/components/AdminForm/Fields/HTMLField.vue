<template>
  <div>
    <field-label :field="field" :show="!content" />
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar elevation-2 pa-1">
        <v-btn text small class="menubar__button" @click="commands.undo">
          <v-icon small>fa-undo-alt</v-icon>
        </v-btn>

        <v-btn text small class="menubar__button" @click="commands.redo">
          <v-icon small>fa-redo-alt</v-icon>
        </v-btn>

        <v-btn
          text
          small
          class="menubar__button"
          :class="{ act: isActive.bold() }"
          @click="commands.bold"
        >
          <v-icon small>fa-bold</v-icon>
        </v-btn>

        <v-btn
          text
          small
          class="menubar__button"
          :class="{ act: isActive.italic() }"
          @click="commands.italic"
        >
          <v-icon small>fa-italic</v-icon>
        </v-btn>

        <v-btn
          text
          small
          class="menubar__button"
          :class="{ act: isActive.strike() }"
          @click="commands.strike"
        >
          <v-icon small>fa-strikethrough</v-icon>
        </v-btn>

        <v-btn
          text
          small
          class="menubar__button"
          :class="{ act: isActive.underline() }"
          @click="commands.underline"
        >
          <v-icon small>fa-underline</v-icon>
        </v-btn>

        <v-btn
          text
          small
          class="menubar__button"
          :class="{ act: isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <v-icon small>fa-paragraph</v-icon>
        </v-btn>

        <v-btn
          text
          small
          class="menubar__button"
          :class="{ act: isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </v-btn>

        <v-btn
          text
          small
          class="menubar__button"
          :class="{ act: isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </v-btn>

        <v-btn
          text
          small
          class="menubar__button"
          :class="{ act: isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </v-btn>

        <v-btn
          text
          small
          class="menubar__button"
          :class="{ act: isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <v-icon small>fa-list-ul</v-icon>
        </v-btn>

        <v-btn
          text
          small
          class="menubar__button"
          :class="{ act: isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <v-icon small>fa-list-ol</v-icon>
        </v-btn>

        <v-btn
          text
          small
          class="menubar__button"
          :class="{ act: isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <v-icon small>fa-quote-right</v-icon>
        </v-btn>

        <v-btn text small class="menubar__button" @click="commands.horizontal_rule">
          <v-icon small>far fa-window-minimize</v-icon>
        </v-btn>

        <v-btn text small class="menubar__button" @click="showChooseImageDialog(commands.image)">
          <v-icon small>far fa-image</v-icon>
        </v-btn>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" class="editor elevation-2 pa-5" />

    <v-dialog v-model="dialog" max-width="1100">
      <v-card>
        <v-card-title class="text--title text-roboto">Выбор изображения</v-card-title>
        <v-card-text>
          <file-picker :mode="'pick'" @file-picked="filePicked"></file-picker>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FieldLabel from '@/components/AdminForm/Fields/FieldLabel'
import FilePicker from '@/components/FilePicker'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
  Placeholder
} from 'tiptap-extensions'

export default {
  name: 'HTMLField',
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  components: {
    FieldLabel,
    FilePicker,
    EditorMenuBar,
    EditorContent
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: this.field.placeholder,
            showOnlyWhenEditable: true,
            showOnlyCurrent: true
          })
        ],
        content: `
          <h1>Yay Headlines!</h1>
          <p>All these <strong>cool tags</strong> are working now.</p>
        `,
        onUpdate: ({ getHTML }) => {
          this.content = getHTML()
          this.$emit('fieldValueChanged', {
            id: this.field.id,
            value: this.content
          })
        }
      }),
      content: ``,
      dialog: false,
      command: null
    }
  },
  created() {
    if (this.field.value) {
      this.content = this.field.value
      this.editor.setContent(this.content)
    }
    this.$emit('fieldValueChanged', {
      id: this.field.id,
      value: this.content
    })
  },
  methods: {
    showChooseImageDialog(command) {
      this.dialog = true
      this.command = command
    },
    filePicked(file) {
      let src = `/images/${file.path}`
      this.command({ src })
      this.dialog = false
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>
<style lang="scss">
.menubar {
  margin-bottom: 1rem;
  border-radius: 5px;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: black;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba(black, 0.05);
    }

    &.act {
      background-color: rgba(black, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}

.editor {
  border-radius: 5px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Roboto', sans-serif;
  }

  img {
    margin: 0 auto;
  }
}

.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
}
</style>
