import { isError } from 'lodash'

export default function detailFetch(dataFetcher) {
  return {
    props: {
      id: [String, Number]
    },
    data() {
      return {
        done: false,
        data: null
      }
    },
    computed: {
      isError() {
        return isError(this.data)
      }
    },
    methods: {
      fetch(id) {
        return dataFetcher(id)
      },
      render({ success, data, msg: message }) {
        if (success) {
          this.data = data
        } else {
          this.data = new Error(message)
        }
        this.done = true
      },
      next() {
        this.done = false
        this.fetch(this.id).then(response => {
          this.render(response)
        })
      }
    },

    watch: {
      id(newId, oldId) {
        if (newId !== oldId) {
          this.next()
        }
      }
    },
    mounted() {
      this.next()
    }
  }
}
