const App = () => {
    return (
        <div>
        <FirstComponent />
        <NamedComponenet name = "Collins" />

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));