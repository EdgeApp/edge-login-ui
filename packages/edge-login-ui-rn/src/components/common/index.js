// @flow
// The plan is to slowly move away from using this index file,
// fixing the Flow errors on a component-by-component basis
// as we import them directly.

import { DropDownList as RealDropDownList } from './DropDownList.js'
import { FormField as RealFormField } from './FormField.js'

// Eventually, the following list will be empty
// and we can remove this entire file:
export const DropDownList: any = RealDropDownList
export const FormField: any = RealFormField
