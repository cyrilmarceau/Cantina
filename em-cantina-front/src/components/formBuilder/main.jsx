import FormNumberInput from './formNumber/FormNumberInput'
import FormRangeNumberInput from './formRangeNumber/FormRangeNumberInput'
import FormSelect from './formSelect/FormSelect'
import FormTextAeraInput from './formTextAera/FormTextAeraInput'
import FormTextInput from './formText/FormTextInput'

import _ from 'lodash'

function FormBuilder({ fieldsList, formInst = null, isCreateOrEdit, fromDynamic, className = '' }) {
    return (
        <div className={className}>
            {_.isArray(fieldsList) &&
                fieldsList.map((fl) => {
                    let render = ''

                    switch (fl.type) {
                        case 'text':
                            render = (
                                <FormTextInput
                                    fromDynamic={fromDynamic}
                                    field={fl}
                                    formInst={formInst}
                                    key={'fl-' + fl.key}
                                />
                            )
                            break
                        case 'number':
                            render = (
                                <FormNumberInput
                                    fromDynamic={fromDynamic}
                                    field={fl}
                                    formInst={formInst}
                                    key={'fl-' + fl.key}
                                />
                            )
                            break
                        case 'select':
                            render = (
                                <FormSelect
                                    fromDynamic={fromDynamic}
                                    isCreateOrEdit={isCreateOrEdit}
                                    field={fl}
                                    formInst={formInst}
                                    key={'fl-' + fl.key}
                                />
                            )
                            break
                        case 'rangeNumber':
                            render = (
                                <FormRangeNumberInput
                                    fromDynamic={fromDynamic}
                                    field={fl}
                                    formInst={formInst}
                                    key={'fl-' + fl.key}
                                />
                            )
                            break
                        case 'textaera':
                            render = (
                                <FormTextAeraInput
                                    fromDynamic={fromDynamic}
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
