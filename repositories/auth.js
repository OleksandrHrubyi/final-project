import UserListing from './UserListing'


export default ($axios, ctx) => ({
  userListing: UserListing($axios, ctx),
})
