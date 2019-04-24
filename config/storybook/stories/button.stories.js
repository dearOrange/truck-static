/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'

import Button from '@components/common/button'

storiesOf('按钮', module)
  .addDecorator(story => {
    let s = story()
    return {
      components: s.components,
      template: `
          <div style="display: flex;">
            ${s.template}
          </div>
      `
    }
  })
  .add('block', () => ({
    components: { 'cool-link-button': Button },
    template: `
    <cool-link-button themes="linear block" size="large">块状按钮</cool-link-button>
    <cool-link-button themes="primary block" size="large">块状按钮</cool-link-button>
    `
  }))
  .add('large', () => ({
    components: { 'cool-link-button': Button },
    template: `
    <cool-link-button themes="linear" size="large">large按钮</cool-link-button>
    <cool-link-button themes="primary" size="large">large按钮</cool-link-button>
    `
  }))
  .add('middle', () => ({
    components: { 'cool-link-button': Button },
    template: `
    <cool-link-button themes="linear" size="middle">middle按钮</cool-link-button>
    <cool-link-button themes="primary" size="middle">middle按钮</cool-link-button>
    `
  }))
  .add('small', () => ({
    components: { 'cool-link-button': Button },
    template: `
    <cool-link-button themes="linear" size="small">small按钮</cool-link-button>
    <cool-link-button themes="primary" size="small">small按钮</cool-link-button>
    `
  }))
  .add('tiny', () => ({
    components: { 'cool-link-button': Button },
    template: `
    <cool-link-button themes="linear" size="tiny">tiny按钮</cool-link-button>
    <cool-link-button themes="primary" size="tiny">tiny按钮</cool-link-button>
    `
  }))

  .add('prepend icon', () => ({
    components: { 'cool-link-button': Button },
    template: `
    <cool-link-button prepend-icon="shoucang" themes="stuffed round" size="large">
      large按钮
    </cool-link-button>
    `
  }))

  .add('append icon', () => ({
    components: { 'cool-link-button': Button },
    template: `
    <cool-link-button append-icon="shoucang" themes="linear round" size="large">
      large按钮
    </cool-link-button>
    `
  }))

  .add('append & prepend icon', () => ({
    components: { 'cool-link-button': Button },
    template: `
    <cool-link-button prepend-icon="shoucang" append-icon="shoucang" themes="linear round" size="large">
      large按钮
    </cool-link-button>
    `
  }))

  .add('only icon', () => ({
    components: { 'cool-link-button': Button },
    template: `
    <cool-link-button icon="shoucang" themes="linear" size="tiny"></cool-link-button>
    <cool-link-button icon="shoucang" themes="linear" size="small"></cool-link-button>
    <cool-link-button icon="shoucang" themes="linear" size="middle"></cool-link-button>
    <cool-link-button icon="shoucang" themes="linear" size="large"></cool-link-button>
    <cool-link-button icon="close" themes="stuffed" icon-bg-color="#fd5076" size="tiny"></cool-link-button>
    <cool-link-button icon="shoucang" themes="stuffed" size="small"></cool-link-button>
    <cool-link-button icon="shoucang" themes="stuffed" size="middle"></cool-link-button>
    <cool-link-button icon="shoucang" themes="stuffed" size="large"></cool-link-button>
    `
  }))
