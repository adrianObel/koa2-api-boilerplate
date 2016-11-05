import { pick } from 'lodash'

export const fromStateToBody = (props) => async (ctx) => {
  ctx.body = {
    ...ctx.body,
    ...pick(ctx.state, props)
  }
}
