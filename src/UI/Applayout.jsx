import { Outlet, useNavigation } from 'react-router-dom'
import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import Loader from './Loader'

function Applayout() {
    const navigate = useNavigation()
    const isLoading = navigate.state === 'loading'
    return (
        <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
            { isLoading && <Loader/>}
            <Header/>
            <div className='overflow-scroll'>
                <main className='max-w-3xl mx-auto overflow-scroll'>
                    <Outlet/>
                </main>
            </div>
            <CartOverview/>
        </div>
    )
}

export default Applayout
