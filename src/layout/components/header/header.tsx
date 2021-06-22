import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { withRouter, NextRouter } from 'next/router';
import cn from 'classnames';

import {
    Nav,
    NavbarToggler,
    NavItem
} from 'reactstrap';

interface PropsHeader {
    router: NextRouter
}

interface StateHeader {
    fixedHeader: boolean;
    toggleMenu: boolean;
}

class Header extends React.Component<PropsHeader, StateHeader>{

    headerRef: React.RefObject<HTMLDivElement>;

    constructor(props: PropsHeader) {
        super(props);

        this.headerRef = React.createRef<HTMLDivElement>();

        let toggle = false;
        if (typeof window !== 'undefined') {
            toggle = (window.screen.width > 800);
        }

        this.state = {
            fixedHeader: false,
            toggleMenu: toggle
        };
    }

    componentDidMount() {
        const _this = this;
        window.addEventListener('scroll', (e) => { _this.handleScroll(e); }, { passive: true });
    }

    componentWillUnmount() {
        const _this = this;
        window.removeEventListener('scroll', (e) => { _this.handleScroll(e); });
    }

    handleScroll(event: Event) {
        if (this.headerRef && this.headerRef.current) {

            const sticky = this.headerRef.current.offsetTop;

            if (window.pageYOffset > sticky) {
                this.setState({
                    fixedHeader: true
                });
            } else {
                this.setState({
                    fixedHeader: false
                });
            }
        }
    }

    sidebarToggle(e: React.MouseEvent) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    sidebarMinimize(e: React.MouseEvent) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    mobileSidebarToggle(e: React.MouseEvent) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    asideToggle(e: React.MouseEvent) {
        e.preventDefault();
        const { toggleMenu } = this.state;
        this.setState({
            toggleMenu: !toggleMenu
        });
    }

    render() {

        const path = this.props.router.pathname;
        const _nav = [
            { name: "Home", url: "/home" },
            { name: "Sobre", url: "/sobre" },
            { name: "Serviços", url: "/servicos" },
            { name: "Contato", url: "/contato" },
        ];

        return (
            <header ref={this.headerRef} className={cn({
                ['header']: true,
                ['fixed-header']: this.state.fixedHeader
            })}>
                <div className="content-header navbar">
                    <div className="content-logo">
                        <Link href="/home">
                            <div className="nav-link">
                                <div className="logo-mini" style={{ backgroundImage: "url('/images/logo-mini.webp')" }}></div>
                                <div className="logo">
                                    <span className="top">Company Name</span>
                                    <span className="bottom">Company Desc</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {!this.state.toggleMenu ? null :
                        <Nav>
                            {_nav.map((curr, i) => {
                                return (
                                    <NavItem className="px-3" key={i}>
                                        <Link href={curr.url}>
                                            <a
                                                className={cn({
                                                    'nav-link': true,
                                                    active: curr.url === path,
                                                })}
                                                onClick={() => {
                                                    if (window.screen.width <= 800) {
                                                        this.setState({
                                                            toggleMenu: false
                                                        });
                                                    }
                                                    window.scrollTo(0, 0);
                                                }}
                                            >
                                                {curr.name}
                                            </a>
                                        </Link>
                                    </NavItem>
                                );
                            })}
                        </Nav>
                    }
                    <NavbarToggler className="d-lg-none" onClick={(e) => this.asideToggle(e)}>
                        <span className="navbar-toggler-icon moon icon-bars" />
                    </NavbarToggler>
                </div>
            </header>
        );
    }
}
export default withRouter(Header);
