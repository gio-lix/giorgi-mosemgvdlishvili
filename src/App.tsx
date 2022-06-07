import {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom"
import Home from "./pages/Home";


class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/all" />} />
                {/*<Route  path="/order">*/}
                {/*    <Order/>*/}
                {/*</Route>*/}
                <Route path="/:id" exact  render={({match }) => (
                    <Home
                        term={match.params.id}
                    />
                )}/>
                {/*<Route path="/product/:id" render={({match}) => (*/}
                {/*    <ProductsById id={match.params.id}/>*/}
                {/*)}/>*/}
            </Switch>
        )
    }
}
export default App