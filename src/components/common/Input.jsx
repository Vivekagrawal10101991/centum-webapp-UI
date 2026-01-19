/**
 * Reusable Input Component
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {string} type - Input type
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Required field
 * @param {string} className - Additional CSS classes
 */
const Input = ({
  label,
  error,
  type = 'text',
  placeholder,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
