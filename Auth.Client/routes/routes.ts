import Login = lazy('./components/login/login.tsx')
import Register = lazy('./components/register/register.tsx')

export default AuthRouter {
    layout(''), [
        index(''),
        route('login', Login),
        route('register', Register)
    ]
} satisfies RouteConfig;