import FormNumberInput from './FormNumberInput'
import FormTextInput from './FormTextInput'
import FormRangeNumberInput from './FormRangeNumberInput'
import FormSelect from './FormSelect'

import _ from 'lodash'

import style from './main.module.scss'

function FormBuilder({ fieldsList, formInst = null, className = '' }) {
    return (
        <div className={style.ctFormBuilder + className}>
            {_.isArray(fieldsList) &&
                fieldsList.map((fl) => {
                    let render = ''

                    switch (fl.type) {
                        case 'text':
                            render = (
                                <FormTextInput
                                    field={fl}
                                    formInst={formInst}
                                    key={'fl-' + fl.key}
                                />
                            )
                            break
                        case 'number':
                            render = (
                                <FormNumberInput
                                    field={fl}
                                    formInst={formInst}
                                    key={'fl-' + fl.key}
                                />
                            )
                            break
                        case 'select':
                            render = (
                                <FormSelect
                                    field={fl}
                                    formInst={formInst}
                                    key={'fl-' + fl.key}
                                />
                            )
                            break
                        case 'rangeNumber':
                            render = (
                                <FormRangeNumberInput
                                    field={fl}
                                    formInst={formInst}
                                    key={'fl-' + fl.key}
                                />
                            )
                            break
                        default:
                            render = (
                                <p key={fl.label}>
                                    {fl.label} - "{fl.type}" field
                                </p>
                            )
                    }

                    return render
                })}
        </div>
    )
}

FormBuilder.defaultProps = {
    fieldsList: [],
}

export default FormBuilder
