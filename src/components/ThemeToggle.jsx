function ThemeToggle({ theme, onToggle }) {
    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={onToggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
    );
}

export default ThemeToggle