import React, { Suspense } from 'react'
import {
    Redirect,
    Route,
    Routes
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
import Login from '../views/Login'
import ProtectedRoute from '../ProtectedRoute'

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const TheContent = () => {
    return (
        <main className="c-main">
            <CContainer fluid>
                <Suspense fallback={loading}>
                    <Routes>
                        {routes.map((route, idx) => {
                            return (
                                <ProtectedRoute
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    component={route.component}
                                />
                            )
                        })}
                        <Route
                            path='/login'
                            exact
                            name='Login'
                            render={props => (
                                <CFade>
                                    <Login {...props} />
                                </CFade>
                            )}
                        />
                    </Routes>
                </Suspense>
            </CContainer>
        </main>
    )
}

export default React.memo(TheContent);