/**
 * Reusable Card Component
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} hover - Enable hover effect
 * @param {function} onClick - Click handler
 */
const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  ...props
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-md overflow-hidden';
  const hoverStyles = hover ? 'hover:shadow-xl transition-shadow duration-300 cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
