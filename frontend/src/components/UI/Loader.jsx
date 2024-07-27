import PropTypes from 'prop-types';

export const Loader = (props) => {
    let {classNames, hidden} = props

    classNames += ` loader`
    return (
        <div hidden={(hidden == undefined ? false : hidden)}>
            <div className={`${classNames}`}>
                <span></span>
            </div>
        </div>
    )
}

// Agrega las validaciones de tipo para las props
Loader.propTypes = {
    classNames: PropTypes.string,
    hidden: PropTypes.bool
    // Otras props si las tienes
};