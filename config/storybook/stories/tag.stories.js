/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

import Tag from '@components/common/tag'

storiesOf('标签', module)
  .addDecorator(story => {
    let s = story()
    return {
      components: s.components,
      template: `
          <div style="display: flex;justify-content: space-evenly;">
            ${s.template}
          </div>
      `
    }
  })
  .add('所有颜色', () => ({
    components: { 'cool-link-tag': Tag },
    template: `
    <cool-link-tag label="警告标签" themes="warn"></cool-link-tag>
    <cool-link-tag label="普通标签" themes="info"></cool-link-tag>
    <cool-link-tag label="成功标签" themes="success"></cool-link-tag>
    <cool-link-tag label="蓝色标签" themes="solemn"></cool-link-tag>
    `
  }))

  .add('无边框', () => ({
    components: { 'cool-link-tag': Tag },
    template: `
    <cool-link-tag label="警告标签" themes="unborder warn"></cool-link-tag>
    <cool-link-tag label="普通标签" themes="unborder info"></cool-link-tag>
    <cool-link-tag label="成功标签" themes="unborder success"></cool-link-tag>
    <cool-link-tag label="蓝色标签" themes="unborder solemn"></cool-link-tag>
    `
  }))

  .add('圆角', () => ({
    components: { 'cool-link-tag': Tag },
    template: `
    <cool-link-tag label="警告标签" themes="round warn"></cool-link-tag>
    <cool-link-tag label="普通标签" themes="round info"></cool-link-tag>
    <cool-link-tag label="成功标签" themes="round success"></cool-link-tag>
    <cool-link-tag label="蓝色标签" themes="round solemn"></cool-link-tag>
    `
  }))

  .add('带关闭', () => ({
    components: { 'cool-link-tag': Tag },
    template: `
    <cool-link-tag label="警告标签" closeable themes="round warn"></cool-link-tag>
    <cool-link-tag label="普通标签" closeable themes="round info"></cool-link-tag>
    <cool-link-tag label="成功标签" closeable themes="round success"></cool-link-tag>
    <cool-link-tag label="蓝色标签" closeable themes="round solemn"></cool-link-tag>
    `,
    methods: { onClose: action('clicked') }
  }))
