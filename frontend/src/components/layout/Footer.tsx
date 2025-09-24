function Footer() {
    return (
      <footer className="footer">
        <div className="container mx-auto text-center py-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} ALT4 MESMTF - All rights reserved
          </p>
        </div>
      </footer>
    );
}

export default Footer;