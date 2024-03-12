export default function Field({ label, htmlFor, children, error }) {
    const id = htmlFor;
    return (
        <div>
            <label htmlFor={id} className="auth-label">{label}</label>
            {children}
            {!!error && <div role="alert" className="text-red-600">{error.message}</div>}
        </div>
    );
}

// const getChildId = ({ children }) => {
//     const child = React.Children.only(children);
//     if ("id" in child.props) {
//         return child.props.id;
//     }
// }