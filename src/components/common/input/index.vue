<template>
  <div class="input" :class="inputClass">
    <div class="input--box">
      <slot name="prev"></slot>
      <input
        :type="type"
        :value="value"
        :name="name"
        @input="$emit('change', $event.target.value)"
        @focus="onFocus"
        @blur="onBlur"
        :placeholder="placeholder"
        autocomplete="off"
      >
      <slot name="suff"></slot>
    </div>
    <div class="message" v-if="isError">
      <cool-link-whitespace size="8"/>
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',

  $_veeValidate: {
    value() {
      return this.value
    },
    name() {
      return this.name
    },
    events: 'change'
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String
    },
    name: String,
    size: {
      type: String,
      default: 'middle',
      validator: function(value) {
        return ['tiny', 'small', 'middle', 'large'].includes(value)
      }
    },
    error: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      focus: false
    }
  },
  computed: {
    inputClass() {
      return {
        [`input__${this.size}`]: true,
        input__error: this.isError,
        input__focus: this.focus
      }
    },

    isError() {
      return this.error.has && this.error.has(this.name)
    },

    errorMessage() {
      if (this.isError) {
        return this.error.first(this.name)
      }
    }
  },
  methods: {
    onFocus() {
      this.focus = true
    },
    onBlur() {
      this.focus = false
      this.$emit('blur')
    }
  },
  mounted() {}
}
</script>

<style lang="postcss" scoped>
.input--box {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0;
  /* border: 1px solid var(--inputBorderColor); */
  background: #fff;
  & > input {
    flex: 1 auto;
    width: 100%;
    /* border: 0; */
    border: 1px solid var(--inputBorderColor);
  }
}

.input__tiny {
  & input {
    height: var(--tiny);
    padding: 0 8px;
  }
}
.input__small {
  & input {
    height: var(--small);
    padding: 0 12px;
  }
}
.input__middle {
  & input {
    height: var(--middle);
    padding: 0 15px;
  }
}
.input__large {
  & input {
    height: var(--large);
    padding: 0 20px;
  }
}

.input__focus {
  & .input--box {
    & > input {
      border-color: var(--siteColor);
    }
  }
}

.input__error {
  & .input--box {
    & > input {
      border-color: #e32425;
    }
  }
  & .message {
    color: #e32425;
  }
}
</style>
