// A single Button component used everywhere (storefront + admin) instead
// of one-off styled <button> tags scattered around. Change the CSS in
// ui.css and every button in the app updates together.
//
// The `as` prop lets this render as something other than <button> — for
// example <Button as={Link} to="/shop">...</Button> renders a router
// Link that's still styled and behaves exactly like every other button.

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon = null,
  iconPosition = 'start', // 'start' | 'end'
  fullWidth = false,
  as: Component = 'button',
  className = '',
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, fullWidth ? 'btn--full' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...rest}>
      {icon && iconPosition === 'start' && <span className="btn__icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'end' && <span className="btn__icon">{icon}</span>}
    </Component>
  );
}
