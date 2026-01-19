/**
 * Reusable Textarea Component
 * @param {string} label - Textarea label
 * @param {string} error - Error message
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Required field
 * @param {number} rows - Number of rows
 * @param {string} className - Additional CSS classes
 */
const Textarea = ({
  label,
  error,
  placeholder,
  required = false,
  rows = 4,
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
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Textarea;
