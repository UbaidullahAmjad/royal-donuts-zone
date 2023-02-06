
const ToppingIcon = ({ iconType }) => {
    return (
        <span className={`topping-icon ${iconType.split(' ')[0]}`} aria-label={iconType}>
            {iconType.charAt(0).toUpperCase()}
        </span>
    );
}

export default ToppingIcon