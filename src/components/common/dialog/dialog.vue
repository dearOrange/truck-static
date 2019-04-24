<template>
  <div class="dialog" :class="dialogClasses" v-show="visible">
    <div class="inner">
      <div class="dialog--close" @click="hide" v-if="closeable">
        <span class="close-btn">
          <svg class="icon" aria-hidden="true">
            <use v-bind:xlink:href="'#icon-close'"></use>
          </svg>
        </span>
      </div>
      <div class="dialog--content">
        <div class="dialog--message">
          <slot>
            <template v-if="hasMessage">
              <div class="message--icon" v-if="hasIcon">
                <svg
                  class="icon"
                  aria-hidden="true"
                  :style="{
                  fill: iconColor
                }"
                >
                  <use v-bind:xlink:href="'#icon-' + icon"></use>
                </svg>
              </div>
              <div class="text">{{message}}</div>

              <template v-if="isConfirm">
                <div class="confirm--btns">
                  <cool-link-button class="confirm--btn" @click="confirmOk" themes="primary">确认</cool-link-button>
                  <cool-link-button class="confirm--btn" @click="confirmCancel">取消</cool-link-button>
                </div>
              </template>
            </template>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',

  data() {
    return {
      message: '',
      type: 'common',
      closeable: true,
      autoClose: false,
      icon: '',
      iconColor: '',
      visible: false,
      confirm: null
    }
  },

  computed: {
    hasIcon() {
      return this.icon !== ''
    },

    hasMessage() {
      return this.message !== ''
    },

    isConfirm() {
      return this.type === 'confirm'
    },

    dialogClasses() {
      return {
        [`dialog__${this.type}`]: true
      }
    }
  },

  methods: {
    confirmOk() {
      let result

      if (
        this.confirm &&
        this.confirm.ok &&
        typeof this.confirm.ok === 'function'
      ) {
        result = this.confirm.ok()
      }

      if (result && result.then) {
        result.then(() => {
          this.hide()
        })
        return
      }
      this.hide()
    },
    confirmCancel() {
      let result
      if (
        this.confirm &&
        this.confirm.cancel &&
        typeof this.confirm.cancel === 'function'
      ) {
        result = this.confirm.cancel()
      }
      if (result && result.then) {
        result.then(() => {
          this.hide()
        })
        return
      }
      this.hide()
    },

    hide() {
      this.visible = false
    },
    show() {
      this.visible = true
      if (this.autoClose && this.autoClose > 0) {
        window.setTimeout(this.hide, this.autoClose)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: var(--zIndex9);
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}
.inner {
  position: relative;
}
.dialog--close {
  position: absolute;
  right: -10px;
  top: -10px;
  padding: 2px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}
.close-btn {
  display: block;
  width: 100%;
  height: 100%;
  padding: 4px;
  background: #333;
  border-radius: 50%;
  & > svg {
    display: block;
    width: 16px;
    height: 16px;
    color: #fff;
  }
}

.dialog--message {
  padding: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .text {
    font-size: 18px;
  }
}

.dialog__alert {
  background: transparent;
  & .dialog--message {
    padding: 0;
    min-width: 120px;
    height: 120px;
    padding: 0 15px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
  }
  & .message--icon {
    margin-bottom: 10px;
    & .icon {
      width: 48px;
      height: 48px;
    }
  }
}

.dialog__confirm {
  & .dialog--message {
    padding: 60px 30px 50px;
    min-width: 556px;
  }

  & .confirm--btns {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 50px;
  }
  & .confirm--btn {
    width: 180px;
    height: 50px;
    margin: 0 15px;
    font-size: 16px;
  }
}
</style>

