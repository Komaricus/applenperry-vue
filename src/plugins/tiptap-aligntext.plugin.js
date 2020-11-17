import { Mark } from 'tiptap'
import { updateMark, markInputRule } from 'tiptap-commands'

export default class AlignText extends Mark {
  get name() {
    return 'aligntext'
  }

  get schema() {
    return {
      attrs: {
        align: {
          default: 'left'
        }
      },
      parseDOM: [
        {
          tag: 'span',
          getAttrs: value => ({ align: value.classList[0] })
        }
      ],
      toDOM: mark => ['span', { class: `${mark.attrs.align} d-block` }, 0]
    }
  }

  commands({ type }) {
    return attrs => updateMark(type, attrs)
  }

  inputRules({ type }) {
    return [markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type)]
  }
}
