<template>
  <div class="pagination-new" v-show="links && links.length > 1">
    <button
      class="btn-pagination btn-pagination-left"
      @click.prevent="choosePagination(prev)"
      :disabled="Number(current) === 1"
    >
      <span
        class="mobile-btn-pagination"
        :class="{ 'disabled-icon-text': Number(current) === 1 }"
      >
        Prev
      </span>
    </button>
    <button
      class="btn-pagination"
      v-show="Number(current) > firstPage && Number(total) > 5"
      @click.prevent="choosePagination(1)"
    >
      1
    </button>
    <div
      v-for="(index, i) in links"
      :key="index !== '...' ? index : `${i}${index}`"
    >
      <button
        class="btn-pagination"
        :class="{ active: index === current, disable_hover: index === '...' }"
        @click="choosePagination(index)"
        :disabled="disable || index === '...'"
      >
        {{ index }}
      </button>
    </div>

    <button
      class="btn-pagination"
      @click.prevent="choosePagination(total)"
      v-show="Number(current) < Number(total) - 1 && Number(total) > 5"
    >
      {{ total }}
    </button>

    <button
      class="btn-pagination btn-pagination-right"
      @click.prevent="choosePagination(next)"
      :disabled="Number(current) === Number(total)"
    >
      <span
        class="mobile-btn-pagination"
        :class="{ 'disabled-icon-text': Number(current) === Number(total) }"
      >
        Next
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationNew',
  props: {
    total: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 3,
      coerce: (limit) => {
        return limit - 1
      },
    },
    disable: { type: Boolean },
  },
  data() {
    return {}
  },
  computed: {
    pages() {
      const pages = []
      for (let i = 1; i <= this.total; i++) {
        pages.push(i)
      }
      return pages
    },
    links() {
      const first = ['...']
      const last = ['...']
      let range = []
      const visiblePaginItem = 3
      const visibleQuntytyItems = 1
      if (this.current <= this.limit + visibleQuntytyItems) {
        range = this.range(1, this.limit + visiblePaginItem)
        return this.current + range.length <= this.total
          ? range.concat(last)
          : range
      } else if (this.current > this.total - this.limit) {
        range = this.range(this.total - this.limit, this.total)
        return this.current - range.length >= 1 ? first.concat(range) : range
      } else {
        range = this.range(
          this.current - Math.ceil(this.limit / 2),
          this.current + Math.ceil(this.limit / 2),
        )
        return first.concat(range).concat(last)
      }
    },
    next() {
      const next = this.current + 1
      return next <= this.total ? next : false
    },
    prev() {
      return this.current - 1
    },
    firstPage() {
      return process.client && window.innerWidth > 1024 ? 3 : 2
    },
  },
  methods: {
    choosePagination(index = this.total) {
      if (isNaN(index) || !index) {
        return
      }
      this.$emit('pagination', index)
    },
    range(start, end) {
      const pages = []
      for (let i = start - 1; i < end; i++) {
        if (this.pages[i]) {
          pages.push(this.pages[i])
        }
      }
      return pages
    },
    isInteger(num) {
      return parseInt(num) === num
    },
  },
}
</script>

<style scoped lang="scss">
.pagination-new {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.btn-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  margin: 0 4px;

  &.active {
    pointer-events: none;
  }

  &:disabled {
    pointer-events: none;
  }
}

.btn-pagination-left {
  padding-left: 0;
  margin-left: 0;
}

.btn-pagination-right {
  padding-right: 0;
  margin-right: 0;
}

.icon-pagination {
  display: block;
}

.icon-pagination-left {
  margin-right: 4px;
}

.icon-pagination-right {
  margin-left: 4px;
}
</style>
