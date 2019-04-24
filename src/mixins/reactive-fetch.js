import { Subject, from as fromPromise } from 'rxjs'
import {
  map,
  switchMap,
  debounceTime
  // distinctUntilChanged
} from 'rxjs/operators'

// import { isEqual } from 'lodash'

// function checkParamsWhetherChanged(prev, next) {
//   let bool = isEqual(prev, next)
//   return bool
// }

export default {
  data() {
    return {
      subject: null
    }
  },
  watch: {
    params: {
      handler: function(newParams) {
        this.page.pageNum = 1
        this.next({ ...newParams })
      },
      deep: true
    }
  },
  methods: {
    subscribe() {
      this.subject
        .pipe(
          map(params => {
            this.loading = true
            return params
          }),
          debounceTime(400),
          // distinctUntilChanged(checkParamsWhetherChanged),
          switchMap(params => {
            this.loading = true
            return fromPromise(this.fetch(params))
          }),

          map(response => {
            return response
          })
          // pairwise(),
          // map(([{ cancel = () => {} }, response]) => {
          //   cancel('cancel')
          //   return response
          // })
        )
        .subscribe(response => {
          this.render(Promise.resolve(response))
        })
    },
    next(params = { ...this.params }) {
      params = { ...this.page, ...params }
      this.subject.next(params)
    }
  },

  created() {
    this.subject = new Subject()
  },

  mounted() {
    this.subscribe()
    this.next()
  },

  destroyed() {
    this.subject.unsubscribe()
  }
}
