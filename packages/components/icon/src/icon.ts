/**
 * Component props / Component utils
 */
import type { ExtractDefaultPropTypes } from 'vue'
import { definePropType } from '@sure-ui/utils'

export const iconProps = {
  size: {
    type: definePropType<string | number>([Number, String])
    // type: Number
  },
  color: {
    type: String
  },
  loading: {
    type: Boolean
  }
}

export type IconProps = ExtractDefaultPropTypes<typeof iconProps>
