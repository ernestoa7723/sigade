import React, {Component} from "react";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class Header extends Component {
    render() {
        const adminSection = () => {
            if (this.props.user !== null) {
                return (
                    <ul className="navbar-nav me-auto mb-2 my-md-auto mb-lg-0">
                        <li className="nav-item d-none d-md-block">
                            <span className="nav-link active"> | </span>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/facultades/">Facultades</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/usuarios/">Usuarios</a>
                        </li>
                    </ul>
                )
            }
        }

        const buttonLog = () => {
            if (this.props.user === null) {
                return (
                    <button type="button" className="btn btn-outline-light col-md-9 col-lg-auto me-2 me-md-0 me-lg-2" data-bs-toggle="modal" data-bs-target="#sign-in-modal">
                        Iniciar sesión
                    </button>
                )
            } else {
                return (
                    <button type="button" className="btn btn-danger col-md-9 col-lg-auto me-2 me-md-0 me-lg-2" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                )
            }
        }

        const handleLogout = () => {
            sessionStorage.removeItem('user')
            window.location.reload()
        }

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark" aria-label="navbar">
                    <div className="container">
                        <a href="/" className="d-flex align-items-center my-auto text-white text-decoration-none">
                            <img src="http://127.0.0.1:3000/assets/fontawesome-free-6.2.1-web/svgs/brands/bootstrap-white.svg" width="30" height="30" alt=""></img>
                            <span className="navbar-brand ms-2">SIGADE</span>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbar">
                            <ul className="navbar-nav me-auto mb-2 my-md-auto mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/juegos-mella/">Juegos Mella</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/deportes/">Deportes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/eventos/">Eventos</a>
                                </li>
                                { adminSection() }
                            </ul>
                            <div className="text-center">
                                { buttonLog() }
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header
