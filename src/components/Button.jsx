import PropTypes from 'prop-types';

export const Button = (props) => {
  const { text, type, size, handleClick, isDisabled } = props

  return (
    <div
      type="button"  
      onClick={!isDisabled ? handleClick : () => {}}
      disabled={isDisabled} 
      className={`button button--${type} button--${size} ${isDisabled ? 'button--disabled' : ''}`}
    > 
      { text } 
    </div>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  handleClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  children: PropTypes.element
};

Button.defaultProps = {
  text: "",
  type: "primary",
  size: "medium",
  handleClick: () => {},
  isDisabled: false
};
