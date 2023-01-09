import React, {Component} from "react";

import '../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class Footer extends Component {
    render() {
        return (
            <footer className="footer mt-auto pt-3 bg-light">
                <div className="container">
                    <div className="text-center py-3 border-top">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                            <img src="http://127.0.0.1:3000/assets/fontawesome-free-6.2.1-web/svgs/brands/bootstrap.svg" width="30" height="30" alt=""></img>
                        </a>
                        <span className="mb-3 mb-md-0 text-muted">© 2022 SIGADE</span>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer
