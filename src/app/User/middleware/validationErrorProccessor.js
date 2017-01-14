export function validationErrorProcess (data) {
    let errors = {}
    data.details.map((error) => {
        Object.assign(errors, {
            [error.context.key] :
                checkRecursion(errors, error)
        })
    })
    return errors
}

function checkRecursion(errors, error) {
    if(typeof errors[error.context.key] == 'undefined' || errors[error.context.key] == null ) {
        return [error.message]
    }else{
        return [...errors[error.context.key], error.message]
    }
}