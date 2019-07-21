import _ from 'lodash'

const profile = async ctx => {
  ctx.log.info(ctx.cookies.get('token'))
  ctx.log.info(ctx.state)
  ctx.body = _.pick(ctx.state.user, ['_id', 'email'])
}

export default {
  profile
}
