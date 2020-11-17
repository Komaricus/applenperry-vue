<template>
  <div>
    <field-label :field="field" :show="!content" />
    <div class="elevation-2">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar pa-1">
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

          <v-btn text small class="menubar__button" @click="commands.horizontal_rule">
            <v-icon small>far fa-window-minimize</v-icon>
          </v-btn>

          <v-btn
            text
            small
            :class="{ act: editor.activeMarkAttrs.aligntext.align === 'text-left' }"
            class="menubar__button"
            @click="commands.aligntext({ align: 'text-left' })"
          >
            <v-icon small>fas fa-align-left</v-icon>
          </v-btn>

          <v-btn
            text
            small
            :class="{ act: editor.activeMarkAttrs.aligntext.align === 'text-center' }"
            class="menubar__button"
            @click="commands.aligntext({ align: 'text-center' })"
          >
            <v-icon small>fas fa-align-center</v-icon>
          </v-btn>

          <v-btn
            text
            small
            :class="{ act: editor.activeMarkAttrs.aligntext.align === 'text-right' }"
            class="menubar__button"
            @click="commands.aligntext({ align: 'text-right' })"
          >
            <v-icon small>fas fa-align-right</v-icon>
          </v-btn>

          <v-btn
            text
            small
            :class="{ act: editor.activeMarkAttrs.aligntext.align === 'text-justify' }"
            class="menubar__button"
            @click="commands.aligntext({ align: 'text-justify' })"
          >
            <v-icon small>fas fa-align-justify</v-icon>
          </v-btn>

          <v-btn
            v-if="field.canAddImage"
            text
            small
            class="menubar__button"
            @click="showChooseImageDialog(commands.image)"
          >
            <v-icon small>far fa-image</v-icon>
          </v-btn>

          <v-btn text small class="menubar__button" @click="openFullScreenDialog">
            <v-icon small>fa-expand-alt</v-icon>
          </v-btn>
        </div>
      </editor-menu-bar>
      <editor-content :editor="editor" class="editor pa-5 mb-5" />
    </div>
    <v-dialog v-model="dialog" max-width="1110" scrollable>
      <v-card>
        <v-card-title class="text--title text-roboto"
          >Выбор изображения<v-tabs v-model="tab" fixed-tabs>
            <v-tab>Загрузить</v-tab>
            <v-tab>Выбрать</v-tab>
          </v-tabs>
          <v-text-field
            v-if="tab === 1"
            v-model="search"
            placeholder="Поиск"
            prepend-inner-icon="fa-search"
            solo
            dense
            hide-details
            class="search mx-auto mt-3"
            clearable
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-tabs-items v-model="tab">
            <v-tab-item class="pa-3">
              <file-uploader :multiple="false" @files-uploaded="filePicked"></file-uploader>
            </v-tab-item>
            <v-tab-item class="pa-3">
              <file-picker
                :mode="'pick'"
                :search-value="search"
                @file-picked="filePicked"
              ></file-picker>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="fullScreenDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar dark color="admin-primary">
            <v-toolbar-title>{{ field.label }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <editor-menu-bar :editor="editor1" v-slot="{ commands, isActive }">
              <div class="menubar pa-1 ml-5">
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

                <v-btn text small class="menubar__button" @click="commands.horizontal_rule">
                  <v-icon small>far fa-window-minimize</v-icon>
                </v-btn>

                <v-btn
                  text
                  small
                  :class="{ act: editor1.activeMarkAttrs.aligntext.align === 'text-left' }"
                  class="menubar__button"
                  @click="commands.aligntext({ align: 'text-left' })"
                >
                  <v-icon small>fas fa-align-left</v-icon>
                </v-btn>

                <v-btn
                  text
                  small
                  :class="{ act: editor1.activeMarkAttrs.aligntext.align === 'text-center' }"
                  class="menubar__button"
                  @click="commands.aligntext({ align: 'text-center' })"
                >
                  <v-icon small>fas fa-align-center</v-icon>
                </v-btn>

                <v-btn
                  text
                  small
                  :class="{ act: editor1.activeMarkAttrs.aligntext.align === 'text-right' }"
                  class="menubar__button"
                  @click="commands.aligntext({ align: 'text-right' })"
                >
                  <v-icon small>fas fa-align-right</v-icon>
                </v-btn>

                <v-btn
                  text
                  small
                  :class="{ act: editor1.activeMarkAttrs.aligntext.align === 'text-justify' }"
                  class="menubar__button"
                  @click="commands.aligntext({ align: 'text-justify' })"
                >
                  <v-icon small>fas fa-align-justify</v-icon>
                </v-btn>

                <v-btn
                  v-if="field.canAddImage"
                  text
                  small
                  class="menubar__button"
                  @click="showChooseImageDialog(commands.image)"
                >
                  <v-icon small>far fa-image</v-icon>
                </v-btn>
              </div>
            </editor-menu-bar>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="fullScreenDialog = false">
                <v-icon>fa-times</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-card-title>
        <v-card-text class="text--main">
          <editor-content :editor="editor1" class="editor pa-5" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FieldLabel from '@/components/AdminForm/Fields/FieldLabel'
import FilePicker from '@/components/FilePicker'
import FileUploader from '@/components/FileUploader'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
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
import AlignText from '@/plugins/tiptap-aligntext.plugin.js'

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
    EditorContent,
    FileUploader
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
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
          }),
          new AlignText()
        ],
        content: ``,
        onUpdate: ({ getHTML }) => {
          this.content = getHTML()
          this.$emit('fieldValueChanged', {
            id: this.field.id,
            value: this.content
          })
        }
      }),
      editor1: new Editor({
        extensions: [
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
          }),
          new AlignText()
        ],
        content: ``,
        onUpdate: ({ getHTML }) => {
          this.content = getHTML()
          this.editor.setContent(this.content)
          this.$emit('fieldValueChanged', {
            id: this.field.id,
            value: this.content
          })
        }
      }),
      content: ``,
      dialog: false,
      command: null,
      tab: 0,
      search: '',
      fullScreenDialog: false
    }
  },
  created() {
    if (Object.prototype.hasOwnProperty.call(this.field, 'value')) {
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
      if (Object.prototype.hasOwnProperty.call(file, 'files')) file = file.files[0]
      let src = `/images/${file.path}`
      this.command({ src })
      this.dialog = false
    },
    openFullScreenDialog() {
      this.editor1.setContent(this.content)
      this.fullScreenDialog = true
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>
<style lang="scss">
@import 'src/assets/colors';

.menubar {
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
  color: $main;
  border-radius: 5px;
  text-align: justify;

  ul {
    list-style: disc;
    margin-left: 24px;
    margin-bottom: 16px;
    p {
      margin-bottom: 8px;
    }
  }

  h1,
  h2,
  h3 {
    font-family: 'Roboto', sans-serif;
    margin-bottom: 16px;
    margin-top: 8px;
    color: $title !important;
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 1.17em;
  }

  img {
    max-width: 100%;
  }

  p {
    font-size: 16px;
    margin-bottom: 16px;
  }
}

.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
}

.search {
  max-width: 360px;
}
</style>
