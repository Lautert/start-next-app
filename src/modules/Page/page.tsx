import React from 'react';
import { withRouter } from 'next/router';

interface PropsPage {
    router: { pathname: string };
}

function Page({ router }: PropsPage) {
    return (
        <p>
            {router.pathname}
        </p>
    );
}

export default withRouter(Page);
