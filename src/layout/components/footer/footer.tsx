import React from 'react';
import { withRouter, NextRouter } from 'next/router'

interface PropsFooter {
    router: NextRouter
}

interface StateFooter { }

class Footer extends React.Component<PropsFooter, StateFooter> {

    render() {
        const path = this.props.router.pathname

        return (
            <footer className="app-footer">
                <div className="content-footer">
                    <div className="body">
                        { path }
                    </div>
                    <div className="developer">
                        Desenvolvido por Guilherme Lautert
                    </div>
                </div>
            </footer>
        )
    }
}
export default withRouter(Footer);
