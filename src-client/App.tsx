import { Header } from './components'
import { foo } from './constant'
import './App.style.css'

function App() {
    return (
        <div className='app'>
            <Header />
            Yo!!!

            foo is
            {foo}
        </div>
    )
}

export { App }
