<template>
  <div class="pagination-new" v-show="links && links.length > 1">
    <button
      class="btn-pagination btn-pagination-left"
      @click.prevent="choosePagination(prev)"
      :disabled="Number(current) === 1"
    >
      <svg
        width="16"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="icon-pagination icon-pagination-left desktop-pagin-arrow"
        :class="{ disableIcon: Number(current) === 1 }"
      >
        <path
          d="M13.5 8.75a.75.75 0 0 0 0-1.5v1.5zM2.47 7.47a.75.75 0 0 0 0 1.06l4.773 4.773a.75.75 0 1 0 1.06-1.06L4.061 8l4.242-4.243a.75.75 0 0 0-1.06-1.06L2.47 7.47zm11.03-.22H3v1.5h10.5v-1.5z"
          fill="var(--bi-color-text)"
        />
      </svg>
      <svg
        width="32"
        height="32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="icon-pagination icon-pagination-left mobile-pagin-arrow"
        :class="{ disableIcon: Number(current) === 1 }"
      >
        <path
          d="M27 17.5a1.5 1.5 0 0 0 0-3v3zM4.94 14.94a1.5 1.5 0 0 0 0 2.12l9.545 9.547a1.5 1.5 0 1 0 2.122-2.122L8.12 16l8.486-8.485a1.5 1.5 0 1 0-2.122-2.122L4.94 14.94zM27 14.5H6v3h21v-3z"
          fill="var(--bi-color-text)"
        />
      </svg>
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
      <svg
        width="16"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="icon-pagination rotate-icon icon-pagination-right desktop-pagin-arrow"
        :class="{ disableIcon: Number(current) === Number(total) }"
      >
        <path
          d="M13.5 8.75a.75.75 0 0 0 0-1.5v1.5zM2.47 7.47a.75.75 0 0 0 0 1.06l4.773 4.773a.75.75 0 1 0 1.06-1.06L4.061 8l4.242-4.243a.75.75 0 0 0-1.06-1.06L2.47 7.47zm11.03-.22H3v1.5h10.5v-1.5z"
          fill="var(--bi-color-text)"
        />
      </svg>
      <svg
        width="32"
        height="32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="icon-pagination rotate-icon icon-pagination-right mobile-pagin-arrow"
        :class="{ disableIcon: Number(current) === Number(total) }"
      >
        <path
          d="M27 17.5a1.5 1.5 0 0 0 0-3v3zM4.94 14.94a1.5 1.5 0 0 0 0 2.12l9.545 9.547a1.5 1.5 0 1 0 2.122-2.122L8.12 16l8.486-8.485a1.5 1.5 0 1 0-2.122-2.122L4.94 14.94zM27 14.5H6v3h21v-3z"
          fill="var(--bi-color-text)"
        />
      </svg>
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
      const visiblePaginItem =
        process.client && window.innerWidth > 1024 ? 3 : 1
      const visibleQuntytyItems =
        process.client && window.innerWidth > 1024 ? 1 : 0
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
@import '@/assets/styles/mediaWidth.scss';

.pagination-new {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media screen and (max-width: $max-mobile-width) {
    justify-content: space-between;
  }
}

.btn-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  margin: 0 4px;
  font-family: ProximaNova;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: var(--bi-color-text);
  background-color: transparent;
  transition: all 0.3s ease;

  &.active {
    color: var(--bi-color-neutral-14);
    pointer-events: none;
  }

  &:disabled {
    color: var(--bi-color-neutral-14);
    pointer-events: none;
  }

  @media screen and (max-width: 375px) {
    padding: 6px;
  }

  &:hover {
    color: var(--bi-color-primary-90);

    .icon-pagination {
      path {
        fill: var(--bi-color-primary-90);
      }
    }
  }
}

.btn-pagination-left {
  padding-left: 0;
  margin-left: 0;

  @media screen and (max-width: 375px) {
    padding-right: 0;
    margin-right: 0;
  }
}

.btn-pagination-right {
  padding-right: 0;
  margin-right: 0;

  @media screen and (max-width: 375px) {
    padding-left: 0;
    margin-left: 0;
  }
}

.icon-pagination {
  display: block;

  path {
    transition: all 0.3s ease;
  }
}

.icon-pagination-left {
  margin-right: 4px;
}

.icon-pagination-right {
  margin-left: 4px;
}

.rotate-icon {
  transform: rotate(-180deg);
}

.disableIcon {
  path {
    fill: var(--bi-color-neutral-14);
  }
}

.disabled-icon-text {
  color: var(--bi-color-neutral-14);
}

.mobile-btn-pagination {
  font-family: ProximaNova;

  @media screen and (max-width: $max-mobile-width) {
    display: none;
  }
}

.mobile-pagin-arrow {
  display: none;

  @media screen and(max-width: $max-mobile-width) {
    display: block;
  }
}

.desktop-pagin-arrow {
  display: block;

  @media screen and(max-width: $max-mobile-width) {
    display: none;
  }
}
</style>
