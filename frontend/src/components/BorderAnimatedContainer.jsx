import "./../styles/BorderAnimatedContainer.css";

function BorderAnimatedContainer({ children }) {
    return (
        <div className="animated-border-wrapper">
            <div className="animated-border-inner">{children}</div>
        </div>
    );
}

export default BorderAnimatedContainer;
