const Footer = () => {
    return (
        <footer>
            <div className="text-center p-6">
                <p className="font-[family-name:var(--font-geist-mono)]">
                    &copy; {new Date().getFullYear()} José Antonio Zarco Romero
                </p>
            </div>
        </footer>
    );
};

export default Footer;