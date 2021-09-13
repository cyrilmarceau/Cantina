import _ from 'lodash'

function FormBuilder({ fieldsList, formInst = null, className = '' }) {
    return (
        <div className={'ct-form-builder ' + className}>
            {_.isArray(fieldsList) &&
                fieldsList.map((field) => {
                    let render = ''

                    switch (field.type) {
                        default:
                            render = (
                                <p key={field.label}>
                                    {field.label} - "{field.type}" field
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
